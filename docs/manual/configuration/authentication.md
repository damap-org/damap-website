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

## 4. User Synchronization & Persistence Architecture

DAMAP v5.0 introduces a **Hybrid Identity Model**. While authentication remains stateless (relying on OIDC JWTs), user **identity** is now persistent. This architectural shift is a direct response to the adoption of privacy-preserving IDP standards (Pairwise IDs).

### 4.1 The Constraint: Pairwise IDs

In previous versions, DAMAP relied on public University IDs (e.g., Employee IDs) to link users. However, modern OIDC configurations increasingly utilize **Pairwise Pseudonymous Identifiers (PPI)**.

- **The Challenge:** The IDP provides an opaques string as the User ID (`sub`). This ID has no correlation with public directories or external Person APIs (like TISS or CRIS).
- **The Consequence:** We can no longer query an external API (e.g., "Find user by Employee ID") and automatically derive their OIDC Login ID. The two datasets are cryptographically unlinkable by design.

### 4.2 Solution: Just-In-Time (JIT) Provisioning

To bridge this gap, DAMAP implements a "Trust on First Use" strategy. The `DamapSecurityAugmentor` acts as the synchronization gateway:

### 4.2 Solution: Just-In-Time (JIT) Provisioning

To bridge this gap, DAMAP implements a "Trust on First Use" strategy. The `DamapSecurityAugmentor` acts as the synchronization gateway:

1. **Request Interception:**  
   The Augmentor intercepts every HTTP request carrying a valid Bearer Token.

2. **Idempotent Synchronization**
   : **Lookup:** The internal `damap_user` table is queried using the opaque Pairwise ID (`sub`).
   : **Provision (Insert):** If the ID is absent, a new user record is atomically created using the token attributes.
   : **Reconciliation (Update):** Existing records are updated to match the current token.

3. **Result:**  
   The `damap_user` table effectively becomes a local "Phonebook" of all pairwise identities that have ever accessed the system.

### 4.3 Caching Strategy

To reconcile the JIT requirement with high-performance standards, DAMAP implements a **Write-Through / Cache-Aside** hybrid layer using Caffeine.

- **Cache Name:** `user-sync-cache`
- **Behavior:** Once a user is synchronized, their ID is cached for **10 minutes**. Subsequent API calls bypass the database write, eliminating write amplification during high-traffic sessions.
- **Security:** This cache affects _metadata updates_ only. Access revocation remains instantaneous because authorization relies on the JWT signature, not the cache.

---

## 5. Access Control Architecture

The decoupling of **Metadata** (Contributors) from **Identity** (Access) is a foundational change in v5.0, driven by the Pairwise ID constraints described above.

### 5.1 Decoupling Access from Contributors

- **Contributor (Metadata):** A text record representing a person involved in a project (e.g., "Project Leader"). These are often fetched from external systems (CRIS/ORCID).
- **Access (Identity):** A cryptographic link to a `damap_user` entity, granting permission to view or edit the DMP.

**Architectural Rationale:**
Because the IDP provides opaque Pairwise IDs, we cannot infer a user's login identity from their Contributor metadata.

- _Example:_ Identifying "Dr. Smith" in a CRIS system yields an Employee ID. It does **not** yield the opaque Pairwise ID required to grant them login access.

Therefore, listing a person as a "Contributor" in the DMP **no longer implies** technical access rights. These concepts are now strictly separated to prevent security ambiguities.

### 5.2 The "Invite" Workflow (User Search)

To grant access, a user must be explicitly invited via the Access Management API.

- **Search Scope:** The endpoint `GET /api/access/user-search` queries the local `damap_user` registry.
- **Implication:** A user is only "discoverable" for invitation after they have logged into DAMAP at least once. This confirms that their Pairwise ID is known to the system and can be reliably linked to a DMP.

---
