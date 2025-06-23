---
title: Reference Manual
---

# DAMAP Reference Manual

Welcome to the DAMAP Reference Manual! This guide is written with system administrators in mind who want to deploy DAMAP in their infrastructure.

!!! tip
    If you are looking for a guide on using DAMAP as a researcher, please [check out our tutorial](https://zenodo.org/records/14000899/preview/DAMAP_tutorial_202410.pdf?include_deleted=0).

## System requirements

In order to successfully deploy DAMAP, you will need:

- A Linux container environment (Docker/Podman/Kubernetes/OpenShift)
- At least 6 GB RAM
- At least 4 GB of disk space
- A PostgreSQL database (Oracle may also work but is not officially supported)
- An OIDC server with PKCE support for authentication

!!! tip
    We offer [an experimental Helm chart](https://github.com/damap-org/damap-backend/pull/393) for Kubernetes deployments.

!!! note
    While you may have some success deploying DAMAP without a container environment (e.g. bare metal or on a VM), several services DAMAP needs (FITS, Gotenberg, etc.) do not support non-containerized environments. We strongly recommend deploying DAMAP in a container environment such as Docker or Kubernetes.

## Planning your deployment

In broad strokes, the DAMAP deployment can be broken down into the following steps:

1. Creating an OIDC client ID for DAMAP
2. Creating a database for DAMAP in your PostgreSQL server
3. Starting the Gotenberg service
4. Starting the FITS service (optional)
5. Configuring and starting the DAMAP backend
6. Deploying the DAMAP frontend on static webserver
7. Creating a reverse proxy/load balancer in front of the DAMAP deployment (optional)

[Read the documentation  :material-arrow-right-circle:{ .middle }](deployment/index.md)

## Need help? Reach out!

If you are stuck during your deployment, please reach out to us at [&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;](&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;). We are happy to help!
