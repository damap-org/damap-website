---
title: Deploying the FITS service
---

# Deploying the FITS service (optional)

DAMAP uses [Islandora FITS](https://github.com/Islandora/islandora_fits) to automatically detect data types for datasets researchers add to DMPs. If you would like to make use of this functionality, you will need to deploy the FITS service.

We currently recommend deploying FITS using the `islandora/fits:main` container image. This exposes the FITS service on port 8080, which the DAMAP backend uses.

!!! warning
    The FITS service should never be exposed to the Internet!

!!! note
    While the FITS service can be deployed without a container, we have no information or documentation on how to achieve such a setup.

!!! warning
    The `islandora/fits:main` unfortunately runs as `root` inside the container. It is therefore not possible to deploy this service in a restricted OpenShift environment. We also do not support this service as part of our Helm chart.

!!! note
    Due to the many shortcomings of this service, we are currently working on deprecating it and replacing it with a variant built directly into DAMAP.