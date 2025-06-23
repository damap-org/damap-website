# OIDC setup for DAMAP

DAMAP authenticates using your institutional [OIDC server](https://openid.net/developers/how-connect-works/). OIDC is an authentication system that lets your users log into DAMAP with their existing credentials rather than creating new credentials.

Please note that DAMAP does not work without an OIDC server. If you do not have an institutional OIDC server, we recommend deploying [Keycloak](https://www.keycloak.org/) as it is known to work with DAMAP, but a description on how to deploy and secure it is beyond the scope of this documentation.

!!! tip
    The DAMAP Helm chart supports deploying Keycloak for testing purposes, as does the Docker Compose setup.

!!! warning
    DAMAP requires the OIDC server to run on a `https://` URL unless the hostname is `localhost`. Make sure your OIDC server has a valid TLS certificate!

## Creating a client ID

In order to use DAMAP, you will need to create a **client ID** in your OIDC configuration that supports the **authorization code flow** with **Proof Key for Code Exchange (PKCE)**. The latter part is important as DAMAP does not work without PKCE support.

Also make sure to configure the correct **redirect URL** to the URL where your frontend will live. Additionally, set the **CORS headers** to match your frontend URL.

Please make a note of the client ID as you will need it when [configuring the backend](../configuration/authentication.md). Additionally, note down the URL at which your users will be able to access your OIDC server, as well as the URL which the backend will use to reach the server if it differs from the user-facing URL.