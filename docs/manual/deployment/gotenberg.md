---
title: Deploying Gotenberg
---

# Deploying Gotenberg (optional)

Optionally, DAMAP can use [Gotenberg](https://gotenberg.dev/) to create preview PDFs. Deploying this service is optional.

Please note that Gotenberg is only available as a container image, not for standalone deployments. When deploying with Kubernetes, we recommend deploying it in the same pod as the backend. If you are deploying with Docker, make sure Gotenberg is reachable by the backend, for example by exposing it on a Docker network.

We currently recommend deploying the Gotenberg service from the `gotenberg/gotenberg:8` container image, which will expose the service on port 3000. The DAMAP backend accesses this service directly.

!!! warning
    The Gotenberg service should never be exposed to the Internet!

[Check the Gotenberg docs for details :material-arrow-right-circle:{ .middle }](https://gotenberg.dev/docs/getting-started/installation){ .md-button }
