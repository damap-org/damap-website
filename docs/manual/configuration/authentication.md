---
title: Configuring authentication
hide:
  - toc
---

# Configuring Authentication

This section details the configuration options for the DAMAP backend for user authentication.

!!! warning "Major Configuration Change (v5.0.0)"
The authentication subsystem has been refactored from a strict structure to a flexible, claim-agnostic architecture. This enables support for wider integration of IDPs and is required for the new Multi-Tenancy features.

If you are upgrading from a previous version, you **must** update your `application.yaml` or environment variables. The old `damap.auth.frontend.*` and `damap.auth.backend.*` properties are deprecated and removed.

## 1. Migration Overview: From Rigid to Flexible

Previously, DAMAP assumed a specific split between "Frontend" and "Backend" OIDC configurations and hardcoded many assumptions about where user data (like email or name) was located in the JWT.

The new configuration flattens this structure and introduces **Explicit Claim Mapping**. You now tell DAMAP exactly which JSON fields in your token correspond to internal user attributes.

### Property Mapping Cheat Sheet

| Legacy Property (Removed)    | New Property (Replacement)         | Description                                                                                                                                                                                                                                                   |
| :--------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `damap.auth.backend.url`     | `damap.auth.server-url`            | Configures the OIDC realm the DAMAP backend should query to verify authentication.                                                                                                                                                                            |
| `damap.auth.frontend.url`    | `damap.auth.issuer`                | Configures the OIDC URL the frontend should send users to in order to log in. This is typically the same as the backend URL, but may differ if the backend can access the OIDC server over a non-public network. This validates the `iss` claim in the token. |
| `damap.auth.backend.client`  | `damap.auth.clientID`              | Client ID as configured in the OIDC Server                                                                                                                                                                                                                    |
| `damap.auth.frontend.client` | `damap.auth.clientID`              | Merged with backend value.                                                                                                                                                                                                                                    |
| `damap.auth.user`            | `damap.auth.user-id-claim`         | The OIDC claim to use as a user ID.                                                                                                                                                                                                                           |
| _(Hardcoded behavior)_       | `damap.auth.email-claim`           | The OIDC claim that holds the users email.                                                                                                                                                                                                                    |
| _(Hardcoded behavior)_       | `damap.auth.user-roles-claim-path` | The OIDC claim path that will hold your DAMAP roles in the access token.                                                                                                                                                                                      |

---

## 2. Core OIDC Configuration

These settings establish the connection between the DAMAP Backend and your OIDC Provider.

| Environment Variable    | application.yaml        | Description                                                                                                                                                                                                                                       |
| :---------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DAMAP_AUTH_SERVER_URL` | `damap.auth.server-url` | **Connection URL.** The URL the backend uses to make direct HTTP requests to the OIDC server (e.g., for key retrieval). <br><br> _Note: In Docker environments, this might be an internal service name like `http://keycloak:8080/realms/damap`._ |
| `DAMAP_AUTH_ISSUER`     | `damap.auth.issuer`     | **Validation URL.** The exact string expected in the `iss` claim of the JWT. This is usually the public-facing URL of your IdP. If the token issuer does not match this string, authentication fails.                                             |
| `DAMAP_AUTH_CLIENT_ID`  | `damap.auth.clientID`   | The Client ID registered in your OIDC provider. This client must support the Authorization Code Flow with PKCE.                                                                                                                                   |
| `DAMAP_AUTH_SCOPE`      | `damap.auth.scope`      | A space-separated list of scopes to request during login. <br>**Default:** `openid profile email offline_access` <br>**Multi-Tenancy:** Must include the scope that grants the affiliation claim.                                                 |

---

## 3. Claim Mapping Configuration

DAMAP no longer assumes the structure of your Access Token. You must map the incoming JSON claims to the internal User entity.

### Identity Attributes

These claims are used to populate the local User Registry during the Just-In-Time (JIT) synchronization process.

| Environment Variable           | application.yaml               | Description                                                                                                |
| :----------------------------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `DAMAP_AUTH_USER_ID_CLAIM`     | `damap.auth.user-id-claim`     | **Primary Key.** The claim containing the unique, persistent user identifier. (often `sub` or `personID`). |
| `DAMAP_AUTH_NAME_CLAIM`        | `damap.auth.name-claim`        | The claim containing the user's full display name. <br> _Standard:_ `name`.                                |
| `DAMAP_AUTH_GIVEN_NAME_CLAIM`  | `damap.auth.given-name-claim`  | The claim containing the user's first name. <br> _Standard:_ `given_name`.                                 |
| `DAMAP_AUTH_FAMILY_NAME_CLAIM` | `damap.auth.family-name-claim` | The claim containing the user's last name. <br> _Standard:_ `family_name`.                                 |
| `DAMAP_AUTH_EMAIL_CLAIM`       | `damap.auth.email-claim`       | The claim containing the user's email address. <br> _Standard:_ `email`.                                   |

### Roles & Authorization

| Environment Variable               | application.yaml                   | Description                                                                                                                                                                     |
| :--------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DAMAP_AUTH_USER_ROLES_CLAIM_PATH` | `damap.auth.user-roles-claim-path` | **JSON Path.** The location of the role list within the token JSON structure.                                                                                                   |
| `DAMAP_AUTH_ADMIN_ROLE_NAME`       | `damap.auth.admin-role-name`       | **Admin Trigger.** The specific value inside the roles list that grants Super Admin privileges (access to global settings, all DMPs, etc.). <br> _Example:_ `damap-super-admin` |
| `DAMAP_AUTH_AFFILIATIONS_CLAIM`    | `damap.auth.affiliations-claim`    | **Multi-Tenancy.** The claim containing user affiliations. DAMAP expects values in the format `role@institution` to resolve the correct tenant database.                        |

---

## 4. Example Configuration

Below is a standard configuration for a **Keycloak** deployment.

```yaml
damap:
  auth:
    # Connection
    server-url: http://keycloak:8080/realms/damap
    issuer: [https://damap.my-university.edu/auth/realms/damap](https://damap.my-university.edu/auth/realms/damap)
    clientID: damap-backend
    scope: openid profile email affiliation

    # Identity Mapping
    user-id-claim: sub
    name-claim: name
    email-claim: email
    given-name-claim: given_name
    family-name-claim: family_name

    # Roles
    user-roles-claim-path: realm_access/roles
    admin-role-name: damap-super-admin
    affiliations-claim: eduPersonScopedAffiliation
```
