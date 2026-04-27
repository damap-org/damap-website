---
title: General options
hide:
    - toc
---

# General options

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the overview](index.md), we provide both the environment variable for stock deployment and the `application.yaml` variant for recompilation.

### General configurations

| Environment variable  | Description                                                                                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `QUARKUS_PROFILE`     | Comma seperated profiles, defaults to prod if left empty. Pass `multitenant` to allow for multiple tenants.                                                   |
| `DAMAP_ENV`           | Either `DEV` or `PROD`.                                                                                                                                       |
| `QUARKUS_HTTP_CORS_ORIGINS`| The URL the backend should send out in the [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). This should match your frontend URL. |
| `DAMAP_TITLE`         | The name of the DAMAP instance is used to set the HTML title.                                                                                                 |

### REST

| Environment variable  | Description                    |
|-----------------------|--------------------------------|
| `REST_GOTENBERG_MP_REST_URL` | URL to your Gotenberg service. |

