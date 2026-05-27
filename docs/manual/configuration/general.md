---
title: General options
hide:
    - toc
---

# General options

This section details the general configuration options you can pass when [deploying the backend](../deployment/backend.md) in a containerized environment.

### General configurations

| Environment variable              | Description                                                                                                                                                   |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_QUARKUS_PROFILE`           | Comma seperated profiles, defaults to prod if left empty. Pass `multitenant` to allow for multiple tenants.                                                   |
| `DAMAP_ENV`                       | Either `DEV` or `PROD`.                                                                                                                                       |
| `DAMAP_QUARKUS_HTTP_CORS_ORIGINS` | The URL the backend should send out in the [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). This should match your frontend URL. |
| `DAMAP_TENANT_AWARE_TITLE`        | The name of the DAMAP instance is used to set the HTML title.                                                                                                 |

### REST

| Environment variable               | Description                    |
|------------------------------------|--------------------------------|
| `DAMAP_REST_GOTENBERG_MP_REST_URL` | URL to your Gotenberg service. |

### Fields

| Environment variable  | Description                                                                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_TENANT_AWARE_FIELDS_ETHICAL_REPORT_ENABLED` | If `true`, enables input field for short ethical report description. Set to `false` if you want to deactivate the feature, `true` by default. |

