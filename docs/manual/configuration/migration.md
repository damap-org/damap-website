---
title: Upgrading to v5.0.0
---

# Migration Guide: Upgrading to DAMAP v5.0.0

DAMAP v5.0 changes how the system handles user logins and project permissions. This guide explains how to update your configuration files and how the new permission system affects your users.

## 1. Configuration Changes

Older versions of DAMAP made hardcoded assumptions about how your login server worked. Version 5.0 gives you full control, but this means you must explicitly map your configuration settings to the new format.

Every attribute related to user identity must now be clearly defined in your `application.yml` file. Please update your configuration by replacing the old attributes with the new ones, and adding the required new fields:

| Old Attribute (v4.x)            | New Attribute (v5.0)               | What it means                                                                                                                               |
| :------------------------------ | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `damap.auth.backend.url`        | `quarkus.oidc.auth-server-url`     | The address the backend uses to verify user logins.                                                                                         |
| `damap.auth.backend.client`     | `quarkus.oidc.client-id`           | The application's registered ID on your login server.                                                                                       |
| `damap.auth.frontend.url`       | `quarkus.oidc.token.issuer`        | The trusted source that issues the login tokens and the address the frontend redirects users to for login.                                  |
| `damap.auth.user`               | `damap.auth.user-id-claim`         | Tells DAMAP which field holds the user's unique login ID.                                                                                   |
| _(None - previously hardcoded)_ | `damap.auth.email-claim`           | You must now explicitly state which field holds the user's email address.                                                                   |
| _(None - previously hardcoded)_ | `damap.auth.name-claim`            | You must now explicitly state which field holds the user's full display name.                                                               |
| _(None - previously hardcoded)_ | `damap.auth.given-name-claim`      | You must now explicitly state which field holds the user's first name.                                                                      |
| _(None - previously hardcoded)_ | `damap.auth.family-name-claim`     | You must now explicitly state which field holds the user's last name.                                                                       |
| _(None - previously hardcoded)_ | `damap.auth.affiliations-claim`    | You must now explicitly state which field holds the user's institutional affiliation (e.g., whether they are a researcher at University A). |
| _(None - previously hardcoded)_ | `damap.auth.user-roles-claim-path` | The location in the login data where DAMAP can find the user's system roles (like admin rights).                                            |
| _(None - previously hardcoded)_ | `damap.auth.admin-role-name`       | The exact name of the role that gives a user full administrator privileges over the DAMAP instance.                                         |
| _(None - previously hardcoded)_ | `damap.auth.scope`                 | A list of permissions DAMAP asks for during login so it can read the user's basic profile information.                                      |

## 2. The New Permission System: Access vs. Contributors

The most noticeable change for everyday users in v5.0 is how editing permissions are granted.

### Why did this change?

In the past, if a user added a colleague's name to the DMP's "Contributors" list, the system automatically gave that colleague permission to edit the document.

However, modern login systems prioritize privacy by using hidden, randomized IDs for user accounts rather than public employee numbers. Because DAMAP can no longer safely guarantee that a public name on a document matches a specific, private login account, the system no longer grants automatic access based on the Contributors list.

- **Contributors** are now just metadata. They are the names of people involved in the research project, which will be printed on the final DMP document.
- **Access** is the actual, verifiable permission to open and edit the DMP in the software.

### How it works now

Because adding a contributor no longer grants access, DMP owners must now manually invite their colleagues to collaborate.

Here is the new workflow for granting access:

1. **The Colleague Logs In:** Before a colleague can be invited to edit a DMP, they must log into DAMAP at least once. This allows the system to securely register their name and email.
2. **The Owner Searches:** The DMP owner goes to the **Access** tab of their project and uses the search bar to find their colleague by name or email.
3. **The Owner Grants Access:** The owner selects the colleague and assigns them the "Editor" or "Viewer" role.

!!! warning "Important Note for Existing DMPs"
Because of this security upgrade, people who previously relied on being a "Contributor" to edit a DMP will lose their editing access when you upgrade to v5.0.

The original creator (Owner) of the DMP will need to go into the **Access** tab and manually search for and add their colleagues as Editors.
