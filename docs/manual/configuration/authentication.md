---
title: Authentication Setup
---

# DAMAP Authentication Setup

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the overview](index.md), we provide configuration through the environment variable for deployment.

To allow users to log into DAMAP, the application needs to understand how your institution's login system (Identity Provider) sends user information.

In DAMAP, you must explicitly tell the system which "claims" (fields of data) in the token correspond to a user's name, email, and ID. All of these settings are defined in your environment variables.

## Authentication Configuration

The following table breaks down the required authentication properties. You will need to adjust the values based on how your specific OpenID Connect (OIDC) server is configured.

| Attribute                            | Example Value                                                         | What it means                                                                                                                                                                |
|:-------------------------------------| :-------------------------------------------------------------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_QUARKUS_OIDC_AUTH_SERVER_URL` | `http://keycloak:8080/realms/damap`                                   | The web address of your login server. DAMAP uses this to verify that a user's login is genuine.                                                                              |
| `DAMAP_QUARKUS_OIDC_TOKEN_ISSUER`    | `http://localhost:8087/realms/damap`                                  | The address the frontend uses to send users to the login page, and the trusted source that issues the login tokens.                                                          |
| `DAMAP_QUARKUS_OIDC_CLIENT_ID`       | `damap`                                                               | The specific name or ID your login server uses to recognize the DAMAP application.                                                                                           |
| `DAMAP_AUTH_SCOPE`                   | `openid profile email offline_access microprofile-jwt roles personID` | A list of permissions DAMAP asks for during login so it can read the user's basic profile information.                                                                       |
| `DAMAP_AUTH_USER_ID_CLAIM`           | `personID`                                                            | The exact field name your login server uses to send a user's unique, permanent ID number.                                                                                    |
| `DAMAP_AUTH_EMAIL_CLAIM`             | `email`                                                               | The field name containing the user's email address.                                                                                                                          |
| `DAMAP_AUTH_NAME_CLAIM`              | `name`                                                                | The field name containing the user's full display name.                                                                                                                      |
| `DAMAP_AUTH_GIVEN_NAME_CLAIM`        | `given_name`                                                          | The field name containing the user's first name.                                                                                                                             |
| `DAMAP_AUTH_FAMILY_NAME_CLAIM`       | `family_name`                                                         | The field name containing the user's last name.                                                                                                                              |
| `DAMAP_AUTH_AFFILIATIONS_CLAIM`      | `affiliation`                                                         | The field name containing the user's institutional affiliation (e.g., whether they are a researcher or student at University A). This is only needed in a multitenant setup. |
| `DAMAP_AUTH_USER_ROLES_CLAIM_PATH`   | `realm_access/roles`                                                  | The location in the access token where DAMAP can find the user's system roles (like admin rights).                                                                           |
| `DAMAP_AUTH_ADMIN_ROLE_NAME`         | `Damap Admin`                                                         | The exact name of the role that gives a user full administrator privileges over the DAMAP instance.                                                                          |
