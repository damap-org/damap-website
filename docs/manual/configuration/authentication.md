---
title: Configuring authentication
hide:
    - toc
---

# Configuring authentication

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the overview](index.md), we provide both the environment variable for stock deployment and the `application.yaml` variant for recompilation.

| Environment variable         | application.yaml             | Description                                                                                                                                                                                                                                |
|------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_AUTH_BACKEND_URL`     | `damap.auth.backend.url`     | The URL the backend can reach the OIDC server on. The URL must be the full path to the realm and the path `.well-known/openid-configuration` must exist under this URL.                                                                    |
| `DAMAP_AUTH_FRONTEND_URL`    | `damap.auth.frontend.url`    | The URL the user can reach the OIDC server under. This must be a `https://` URL unless the hostname is `localhost`.  The URL must be the full path to the realm and the path `.well-known/openid-configuration` must exist under this URL. | 
| `DAMAP_AUTH_BACKEND_CLIENT`  | `damap.auth.backend.client`  | The client ID configured in the OIDC server for the backend to use. This client ID must be configured to support the authorization code flow with PKCE.                                                                                    |
| `DAMAP_AUTH_FRONTEND_CLIENT` | `damap.auth.frontend.client` | The client ID configured in the OIDC server for the frontend to use. This client ID must be configured to support the authorization code flow with PKCE.                                                                                   |
| `DAMAP_AUTH_SCOPE`           | `damap.auth.scope`           | The scopes to request from the OIDC server, separated by space.                                                                                                                                                                            |
| `DAMAP_AUTH_USER`            | `damap.auth.user`            | The OIDC claim to use as a user ID. Defaults to `personID`.                                                                                                                                                                                |
