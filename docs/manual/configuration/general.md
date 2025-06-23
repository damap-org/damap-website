---
title: General options
hide:
    - toc
---

# General options

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the overview](index.md), we provide both the environment variable for stock deployment and the `application.yaml` variant for recompilation.

| Environment variable  | application.yaml     | Description                                                                                                                                                   |
|-----------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_ENV`           | `damap.env`          | Either `DEV` or `PROD`.                                                                                                                                       |
| `DAMAP_ORIGINS`       | `damap.origins`      | The URL the backend should send out in the [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). This should match your frontend URL. |
| `DAMAP_FITS_URL`      | `damap.fits-url`     | URL to your [FITS service](../deployment/fits.md). (e.g. `http://fits-service:8080/fits`)                                                                     |
| `DAMAP_GOTENBERG_URL` | `damap.gotenbergurl` | URL to your [Gotenberg service](../deployment/gotenberg.md). (e.g. `http://gotenberg:3000`)                                                                   |
| `DAMAP_TITLE`         | `damap.title`        | The name of the DAMAP instance.                                                                                                                               |
