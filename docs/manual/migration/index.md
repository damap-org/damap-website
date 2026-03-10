---
title: Migrating DAMAP to v5.0.0
---

# Migrating DAMAP to v5.0.0

This guide outlines the steps for successfully migrating DAMAP from 4.x.x to 5.0.0 and higher or for migration from a locally deployed instance into the cloud.

## 1. Configuration Changes

Older versions of DAMAP made hardcoded assumptions about how your login server worked. Version 5.0.0 gives you full control, but this means you must explicitly map your configuration settings to the new format.

Every attribute related to user identity must now be clearly defined in your environment variables (the previous approach using the application.yml is getting deprecated). Please update your configuration by replacing the old attributes with the new ones, and adding the required new fields:

| Old Attribute (v4.x)            | New Attribute (v5.0.0) - Env Variable | What it means                                                                                                                               |
| :------------------------------ | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `damap.auth.backend.url`        | `QUARKUS_OIDC_AUTH_SERVER_URL`        | The address the backend uses to verify user logins.                                                                                         |
| `damap.auth.backend.client`     | `QUARKUS_OIDC_CLIENT_ID`              | The application's registered ID on your login server.                                                                                       |
| `damap.auth.frontend.url`       | `QUARKUS_OIDC_TOKEN_ISSUER`           | The trusted source that issues the login tokens and the address the frontend redirects users to for login.                                  |
| `damap.auth.user`               | `DAMAP_AUTH_USER_ID_CLAIM`            | Tells DAMAP which field holds the user's unique login ID.                                                                                   |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_EMAIL_CLAIM`              | You must now explicitly state which field holds the user's email address.                                                                   |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_NAME_CLAIM`               | You must now explicitly state which field holds the user's full display name.                                                               |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_GIVEN_NAME_CLAIM`         | You must now explicitly state which field holds the user's first name.                                                                      |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_FAMILY_NAME_CLAIM`        | You must now explicitly state which field holds the user's last name.                                                                       |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_AFFILIATIONS_CLAIM`       | You must now explicitly state which field holds the user's institutional affiliation (e.g., whether they are a researcher at University A). |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_USER_ROLES_CLAIM_PATH`    | The location in the login data where DAMAP can find the user's system roles (like admin rights).                                            |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_ADMIN_ROLE_NAME`          | The exact name of the role that gives a user full administrator privileges over the DAMAP instance.                                         |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_SCOPES`                   | A list of permissions DAMAP asks for during login so it can read the user's basic profile information.                                      |

## 2. The New Permission System: Access vs. Contributors

Another noticeable change for everyday users in v5.0.0 is how editing permissions are granted.

### Why did this change?

In the past, if a user added a colleague's name to the DMP's "Contributors" list, the system automatically prelaoded the user in the access management list with "NO_RIGHTS" permissions. This meant that the colleague could easily be upgraded to "Editor".

However, after upgrading our authentication to use the EduID federation, there no longer is a guarantee, that for each user, we get their actual university/employee ID. For privacy reasons, randomized IDs (pairwise IDs) are used for user accounts rather than public employee numbers. Because DAMAP can no longer safely guarantee that a given ID from a CRIS system matches a specific, private login account (through the EduID federation), the system no longer is able to automaticly preload the list based on the Contributors list.

- **Contributors** are just metadata. They are the names of people involved in the research project, which will be printed on the final DMP document. The ID can for instance come from a CRIS system and is identical for the employee across all systems.
- **Access** is the actual, verifiable permission to open and edit the DMP in the software. The ID for access management is the one from the login system, which does not always match the one from the Contributor.

### How it works now

Because adding a contributor no longer preloads it, DMP owners must now manually invite their colleagues to collaborate.

Here is the new workflow for granting access:

1. **The Colleague Logs In:** Before a colleague can be invited to edit a DMP, they must log into DAMAP at least once. This allows the system to securely register them as users.
2. **The Owner Searches:** The DMP owner goes to the **Access** tab of their project and uses the search bar to find their colleague by name or email.
3. **The Owner Grants Access:** The owner selects the colleague and assigns them the "Editor" or "Owner" role.
