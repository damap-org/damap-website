# Authentication & User Management

## 1. Security Architecture Overview

DAMAP implements a **Token Exchange Architecture** to decouple the internal application logic from external Identity Providers (IdPs). This approach ensures that the application core remains agnostic to the authentication source (Keycloak, Satosa, local dev) while enforcing a strict, uniform internal security context.

### The Token Exchange Pattern

1.  **External Authentication:** The frontend authenticates the user via an OIDC Provider (e.g., Satosa Instance, Keycloak or a dev Keycloak).
2.  **Token Swap:** The frontend receives an **External Access Token**. It sends this token to the DAMAP Backend endpoint `/api/auth/jwt`.
3.  **Verification & Provisioning:** The backend verifies the external token (either via signature validation (JWK) or UserInfo introspection), synchronizes the user state to the `damap_user` table, and determines permissions.
4.  **Internal Session:** The backend issues a standardized **Internal DAMAP JWT** signed with the backend's private RSA key.
5.  **API Access:** All subsequent requests to the API are authenticated using this internal JWT.

---

## 2. Authentication Strategies

The system behavior is controlled by the `damap.auth.method` configuration property.

### A. Federation Mode (Production)

- **Configuration:** `damap.auth.method=federation`
- **Target Environment:** Multi-tenant production environments (e.g., using Satosa).
- **Validation Mechanism:** **Opaque Token Introspection**.
  - The backend does _not_ attempt to parse the incoming token as a JWT.
  - It performs a synchronous `GET` request to the OIDC `UserInfo` endpoint using the token as a Bearer credential.
  - **Security Rationale:** This allows support for opaque tokens and ensures that the IdP validates the session status in real-time during the initial login.
- **Role Management:** **Manual**. Federation providers typically do not expose DAMAP-specific roles. Admin rights must be granted by database administrators.

### B. Keycloak Mode (Development / Standalone)

- **Configuration:** `damap.auth.method=keycloak`
- **Target Environment:** Local development or single-institution deployments.
- **Validation Mechanism:** **JWT Validation**.
  - Incoming tokens are validated for signature, expiration, and issuer locally by using the provided JWK Url.
- **Role Management:** **Synchronized**. If the token contains the configured admin role (default: `Damap Admin`), the user is automatically promoted to Admin in the local database.

---

## 3. Cryptography & Key Management

The Internal DAMAP JWT is signed using **RS256** (RSA Signature with SHA-256).

### Key Pair Configuration

The backend requires an RSA Key Pair.

- **Private Key:** Used to sign the internal JWTs. Configured via `smallrye.jwt.sign.key.location`.
- **Public Key:** Used to verify the internal JWTs (by the backend itself on subsequent requests). Configured via `mp.jwt.verify.publickey.location`.

### Generating Production Keys

Do not use the default keys provided in `src/main/resources` for production. Generate a secure 2048-bit (or higher) RSA pair using OpenSSL:

```bash
# 1. Generate Private Key
openssl genpkey -algorithm RSA -out privateKey.pem -pkeyopt rsa_keygen_bits:2048

# 2. Extract Public Key
openssl rsa -pubout -in privateKey.pem -out publicKey.pem
```

Ensure file permissions on the private key are restrictive (e.g., `chmod 600`) and the path is correctly referenced in your production `application.yaml`.

---

## 4\. User Management

### Database Schema

User identity is persisted in the `damap_user` table. This acts as a local cache of the identity to support relational mapping (e.g., linking a DMP to a specific user ID).

| Column     | Description                                                        |
| :--------- | :----------------------------------------------------------------- |
| `id`       | Internal Primary Key (BigInt).                                     |
| `subject`  | The immutable User ID from the IdP (mapped via `damap.auth.user`). |
| `email`    | User's email address.                                              |
| `nickname` | User's display name.                                               |
| `is_admin` | Boolean flag determining system-wide administrative access.        |

### Just-in-Time (JIT) Provisioning

DAMAP uses JIT provisioning to minimize administrative overhead:

1.  **On First Login:** If a user with the given `subject` does not exist, a new record is created.
2.  **On Subsequent Logins:** The `email` and `nickname` fields are compared against the fresh data from the IdP. If they differ, the database record is updated.
    - _Note:_ The `is_admin` flag is **never** overwritten during this sync in Federation mode.

### Affiliation & Multi-Tenancy

Affiliation is critical for determining which organizational logic applies to a user.

- **Extraction:** The system extracts the claim configured via `damap.auth.affiliation-name` (e.g., `eduPersonScopedAffiliation`).
- **Sanitization:**
  1.  Brackets `[]` are removed (common in list-based claims).
  2.  If multiple values exist (comma-separated), only the **first** value is taken.
  3.  The domain is extracted (substring after `@`).
- **Example:** Input `[staff@tuwien.ac.at]` results in the affiliation `tuwien.ac.at`.

---

## 5\. Session Management & Token Refresh

To balance security and user experience, DAMAP implements a **Strict One-Time Refresh Policy**.

### Internal Token Structure

The internal JWT contains specific claims to control the session lifecycle:

```json
{
  "iss": "damap-backend",
  "sub": "user-subject-id",
  "upn": "User Name",
  "email": "user@domain.com",
  "affiliation": "domain.com",
  "groups": ["default-roles-damap"],
  "can_be_refreshed": true,
  "exp": <Timestamp + 1 Hour>
}
```

### Refresh Logic (`/api/auth/refresh`)

A user can exchange an expired token for a new one without redirecting to the IdP, provided specific conditions are met:

1.  **Grace Period:** The old token must have expired less than **3 hours** ago (`TOKEN_POST_EXPIRATION_REFRESH_VALIDITY`).
2.  **Refresh Flag:** The old token must contain the claim `"can_be_refreshed": true`.

**The Security Control:**
When a token is refreshed, the **new** token is issued with `"can_be_refreshed": false`.

- **Result:** A session can be extended exactly **once**.
- **Max Session Duration:** 1 Hour (Initial) + 1 Hour (Refreshed) = **2 Hours Maximum**.
- After the second token expires, the user **must** re-authenticate via the frontend (OIDC Redirect).

---

## 6\. Extended Configuration Reference

The following table details every authentication property found in `application.yaml`.

### A. General Strategy & OIDC Provider

These settings configure how DAMAP connects to the Identity Provider (e.g., Satosa or Keycloak).

| Property                           | Example Value (Production)       | Description                                                                                                                   |
| :--------------------------------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `damap.env`                        | `PROD`                           | Sets the application environment. MUST be `PROD` for deployment to enable strict security checks.                             |
| `damap.auth.method`                | `federation`                     | **Critical.** Defines the auth strategy. Use `federation` for Satosa/OIDC Proxies, `keycloak` for direct Keycloak usage.      |
| `damap.auth.backend.url`           | `https://auth.tuwien.ac.at/oidc` | **Base URL** of the OIDC provider. Used by the internal REST client to find the `/userinfo` endpoint.                         |
| `damap.auth.backend.issuer`        | `https://auth.tuwien.ac.at`      | The `iss` (Issuer) string expected in the OIDC tokens.                                                                        |
| `damap.auth.backend.loginUrl`      | `.../saml/oidc/authorization`    | The URL where the frontend redirects the user to start the login flow.                                                        |
| `damap.auth.backend.tokenEndpoint` | `.../oidc/token`                 | The endpoint where the frontend exchanges the authorization code for an access token.                                         |
| `damap.auth.backend.client`        | `damap-backend-client`           | The Client ID registered at the IdP.                                                                                          |
| `damap.auth.backend.dummySecret`   | `nsAcyLbr...`                    | A "dummy" secret used by public clients (SPA) to satisfy OIDC spec requirements. Not considered sensitive for public clients. |
| `damap.auth.frontend.url`          | `https://auth.tuwien.ac.at/oidc` | The OIDC URL reachable by the User's Browser (Frontend). Usually the same as backend URL unless behind a VPN.                 |

### B. Claims & User Mapping

These settings map the incoming OIDC attributes to internal DAMAP User fields.

| Property                      | Default / Example             | Description                                                                                                                                        |
| :---------------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `damap.auth.scope`            | `openid profile email extras` | **Crucial.** The scopes requested during login. Must include whatever scope triggers the release of Affiliation (e.g., `extras` or `affiliation`). |
| `damap.auth.user`             | `sub`                         | The claim to use as the **Immutable User ID**. In Satosa, this is often `sub` or `personID`.                                                       |
| `damap.auth.claims.email`     | `email`                       | The JSON key in the UserInfo response containing the email.                                                                                        |
| `damap.auth.claims.nickname`  | `name`                        | The JSON key in the UserInfo response containing the display name.                                                                                 |
| `damap.auth.affiliation-name` | `my-institution.edu`          | The default claim value to use for affiliation in Keycloak mode.                                                                                   |
| `damap.auth.admin-role-name`  | `Damap Admin`                 | The role value to look for in the `groups` claim (Only applies in `keycloak` mode).                                                                |

### C. Cryptography (JWT Signing)

These settings control the **Internal DAMAP JWT**. These keys belong to DAMAP, not the IdP.

| Property                           | Value                        | Description                                                                                  |
| :--------------------------------- | :--------------------------- | :------------------------------------------------------------------------------------------- |
| `smallrye.jwt.sign.key.location`   | `file:///app/certs/priv.pem` | **Private Key.** Used to sign tokens issued by DAMAP. Must be kept secret.                   |
| `mp.jwt.verify.publickey.location` | `file:///app/certs/pub.pem`  | **Public Key.** Used by DAMAP to verify its own tokens on subsequent API calls.              |
| `mp.jwt.verify.publickey.issuer`   | `damap-backend-api`          | The `iss` claim stamped into internal tokens. Must match what the backend expects to verify. |

### D. Quarkus & Internal Wiring

Advanced settings for the underlying framework.

| Property                                        | Value                       | Description                                                                                                                                             |
| :---------------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quarkus.oidc.enabled`                          | `false`                     | **Must be false.** We handle OIDC manually via `AuthService` to support the Token Exchange pattern. Enabling this would conflict with our custom logic. |
| `rest.auth/mp-rest/url`                         | `${damap.auth.backend.url}` | Configures the MicroProfile REST Client (`UserInfoRestClient`) to point to the IdP.                                                                     |
| `quarkus.http.auth.permission.permit-all.paths` | `/api/auth/refresh`         | Explicitly allows unauthenticated access to the refresh endpoint (validation happens inside the code).                                                  |
