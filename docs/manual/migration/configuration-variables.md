---
title: Configuration variables
---

# Configuration variables

With DAMAP v5.0.0, we are going away from reconfiguring the application through the `application.yaml` and are starting to only support environment variables. The table below will map from the old `application.yaml` values to the new environment variables.

| Old Attribute (v4.x.x)           | Environment variable                  | Description                                                                                                                                                   |
|----------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _(None - previously not needed)_ | `QUARKUS_PROFILE`                     | Comma seperated profiles, defaults to prod if left empty. Pass `multitenant` to allow for multiple tenants.                                                   |
| `damap.env`                      | `DAMAP_ENV`                           | Either `DEV` or `PROD`.                                                                                                                                       |
| `damap.origins`                  | `QUARKUS_HTTP_CORS_ORIGINS`           | The URL the backend should send out in the [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). This should match your frontend URL. |
| `damap.title`                    | `DAMAP_TITLE`                         | The name of the DAMAP instance is used to set the HTML title.                                                                                                 |
| `damap.fits-url`                 | `REST_FITS_MP_REST_URL`               | URL to your [FITS service](../deployment/fits.md). (e.g. `http://fits-service:8080/fits`)                                                                                                                                                              |
| `damap.gotenbergurl`             | `REST_GOTENBERG_MP_REST_URL`          | URL to your [Gotenberg service](../deployment/gotenberg.md). (e.g. `http://gotenberg:3000`)                                                                                                                                                              |
| `damap.fields.ethical-report-enabled` | `DAMAP_FIELDS_ETHICAL_REPORT_ENABLED` |  If `true`, enables input field for short ethical report description. Set to `false` if you want to deactivate the feature, `true` by default.                                                                                                                                                                                                                                                        |
