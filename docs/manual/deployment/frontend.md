---
title: Deploying the DAMAP frontend
---

# Deploying the DAMAP frontend

The [DAMAP frontend](https://github.com/damap-org/damap-frontend) is an Angular application that comes as a standard nginx container with the name of `ghcr.io/damap-org/damap-frontend:next` and will listen on port 8080.

!!! tip
    The frontend OIDC and most other settings are configured [through the backend](backend.md). For text and color changes you will need to [recompile the frontend](../customization/index.md).

!!! note "Testing DAMAP"
    For your first test run, we recommend opening the developer console of your browser (<kbd>F12</kbd>) as well as the log output of the DAMAP backend. You can now reload the DAMAP page and look if there are any errors. 