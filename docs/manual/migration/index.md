---
title: Migrating DAMAP to v5.0.0
---

# Migrating DAMAP to v5.0.0

This guide outlines the steps for successfully migrating DAMAP from 4.x.x to 5.0.0 and higher or for migration from a locally deployed instance into the cloud.
In version 5.0.0, DAMAP moved away from configuring the application via application.yaml and now relies exclusively on environment variables for configuration.
We offer an [example.env](https://github.com/damap-org/damap-backend/blob/next/example.env) with all available environment variables to make the transition and future deployments as easy as possible.

The following migration sections highlight the most important changes:

- [Authentication](authentication.md)
- [Access](access.md)
- [Configuration Variables](configuration-variables.md)
