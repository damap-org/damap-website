---
title: Authentication Setup
---

# DAMAP v5.0 Authentication Setup

To allow users to log into DAMAP, the application needs to understand how your institution's login system (Identity Provider) sends user information.

In DAMAP v5.0, you must explicitly tell the system which "claims" (fields of data) in the login token correspond to a user's name, email, and ID. All of these settings are defined in your `application.yml` file.

## Authentication Configuration

The following table breaks down the required authentication properties. You will need to adjust the values based on how your specific OpenID Connect (OIDC) server is configured.

| Attribute                          | Default Value                                                         | What it means                                                                                                                    |
| :--------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `quarkus.oidc.auth-server-url`     | `http://keycloak:8080/realms/damap`                                   | The web address of your login server. DAMAP uses this to verify that a user's login is genuine.                                  |
| `quarkus.oidc.token.issuer`        | `http://localhost:8087/realms/damap`                                  | The address the frontend uses to send users to the login page, and the trusted source that issues the login tokens.              |
| `quarkus.oidc.client-id`           | `damap`                                                               | The specific name or ID your login server uses to recognize the DAMAP application.                                               |
| `damap.auth.scope`                 | `openid profile email offline_access microprofile-jwt roles personID` | A list of permissions DAMAP asks for during login so it can read the user's basic profile information.                           |
| `damap.auth.user-id-claim`         | `personID`                                                            | The exact field name your login server uses to send a user's unique, permanent ID number.                                        |
| `damap.auth.email-claim`           | `email`                                                               | The field name containing the user's email address.                                                                              |
| `damap.auth.name-claim`            | `name`                                                                | The field name containing the user's full display name.                                                                          |
| `damap.auth.given-name-claim`      | `given_name`                                                          | The field name containing the user's first name.                                                                                 |
| `damap.auth.family-name-claim`     | `family_name`                                                         | The field name containing the user's last name.                                                                                  |
| `damap.auth.affiliations-claim`    | `affiliation`                                                         | The field name containing the user's institutional affiliation (e.g., whether they are a researcher or student at University A). |
| `damap.auth.user-roles-claim-path` | `realm_access/roles`                                                  | The location in the login data where DAMAP can find the user's system roles (like admin rights).                                 |
| `damap.auth.admin-role-name`       | `Damap Admin`                                                         | The exact name of the role that gives a user full administrator privileges over the DAMAP instance.                              |
