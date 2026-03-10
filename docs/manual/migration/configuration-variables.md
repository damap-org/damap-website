---
title: Configuration variables
---

# Configuration variables

With DAMAP v5.0.0, we are going away from reconfiguring the application through the `application.yaml` and are starting to only support environment variables. The table below will map from the old `application.yaml` values to the new environment variables.

| Old Attribute (v4.x.x)           | Environment variable         | Description                                                                                                                                                   |
| -------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(None - previously not needed)_ | `QUARKUS_PROFILE`            | Comma seperated profiles, defaults to prod if left empty. Pass `multitenant` to allow for multiple tenants.                                                   |
| `damap.env`                      | `DAMAP_ENV`                  | Either `DEV` or `PROD`.                                                                                                                                       |
| `damap.origins`                  | `QUARKUS_HTTP_CORS_ORIGINS`  | The URL the backend should send out in the [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). This should match your frontend URL. |
| `damap.title`                    | `DAMAP_TITLE`                | The name of the DAMAP instance is used to set the HTML title.                                                                                                 |
| `damap.fits-url`                 | `REST_FITS_MP_REST_URL`      | URL to your [FITS service](../deployment/fits.md). (e.g. `http://fits-service:8080/fits`)                                                                     |
| `damap.gotenbergurl`             | `REST_GOTENBERG_MP_REST_URL` | URL to your [Gotenberg service](../deployment/gotenberg.md). (e.g. `http://gotenberg:3000`)                                                                   |

Older versions of DAMAP made hardcoded assumptions about how your login server worked. Version 5.0.0 gives you full control, but this means you must explicitly map your configuration settings to the new format. Please update your configuration by replacing the old attributes with the new ones, and adding the required new fields:

| Old Attribute (v4.x.x)          | Environment Variable               | Description                                                                                                                                 |
| :------------------------------ | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `damap.auth.backend.url`        | `QUARKUS_OIDC_AUTH_SERVER_URL`     | The address the backend uses to verify user logins.                                                                                         |
| `damap.auth.backend.client`     | `QUARKUS_OIDC_CLIENT_ID`           | The application's registered ID on your login server.                                                                                       |
| `damap.auth.frontend.url`       | `QUARKUS_OIDC_TOKEN_ISSUER`        | The trusted source that issues the login tokens and the address the frontend redirects users to for login.                                  |
| `damap.auth.user`               | `DAMAP_AUTH_USER_ID_CLAIM`         | Tells DAMAP which field holds the user's unique login ID.                                                                                   |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_EMAIL_CLAIM`           | You must now explicitly state which field holds the user's email address.                                                                   |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_NAME_CLAIM`            | You must now explicitly state which field holds the user's full display name.                                                               |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_GIVEN_NAME_CLAIM`      | You must now explicitly state which field holds the user's first name.                                                                      |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_FAMILY_NAME_CLAIM`     | You must now explicitly state which field holds the user's last name.                                                                       |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_AFFILIATIONS_CLAIM`    | You must now explicitly state which field holds the user's institutional affiliation (e.g., whether they are a researcher at University A). |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_USER_ROLES_CLAIM_PATH` | The location in the login data where DAMAP can find the user's system roles (like admin rights).                                            |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_ADMIN_ROLE_NAME`       | The exact name of the role that gives a user full administrator privileges over the DAMAP instance.                                         |
| _(None - previously hardcoded)_ | `DAMAP_AUTH_SCOPES`                | A list of permissions DAMAP asks for during login so it can read the user's basic profile information.                                      |
