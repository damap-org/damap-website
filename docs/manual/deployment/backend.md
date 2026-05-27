---
title: Deploying the DAMAP backend
---

# Deploying the DAMAP backend

The DAMAP backend is a Java application written for Quarkus. We currently only support containerized deployments and recommend using the `ghcr.io/damap-org/damap-backend:next` image unless you have created a custom CRIS integration that needs recompilation.

You can pass all configuration options to the DAMAP backend using environment variables. Please see the [Configuration](../configuration/index.md) and [CRIS System Integration](../cris/index.md) sections for details on available configuration options. DAMAP also offers a ready-made [example.env](https://github.com/damap-org/damap-backend/blob/next/example.env) file with all available environment variables you can use to configure your application in a dockerized setup.

## Minimum configuration

At the very least, you will need to provide the following environment variables for containerized DAMAP to work:

- `DAMAP_DB_HOST` like `SERVERNAME`.
- `DAMAP_DB_KIND` as your database engine name (e.g. `postgresql`).
- `DAMAP_DB_NAME` like `damap`.
- `DAMAP_DB_PORT` like `5432`.
- `DAMAP_DB_KIND` type of the database, allowed values `postgresql` and `oracle`.
- `DAMAP_DB_USERNAME` and `DAMAP_DB_PASSWORD` with your database credentials
- `DAMAP_DB_DATA_HOST_PATH` path on the machine where database data should be stored, like `./data`
- `DAMAP_HOSTNAME` like your.domain.com, no trailing slash or protocol (http/https) - can be ignored when external OIDC server is used
- `DAMAP_QUARKUS_HTTP_CORS_ORIGINS` containing the valid origin URLs for your frontend.
- `DAMAP_QUARKUS_OIDC_AUTH_SERVER_URL` containing the OIDC server URL the backend should use.
- `DAMAP_QUARKUS_OIDC_TOKEN_ISSUER` containing the user-accessible OIDC URL.
- `DAMAP_QUARKUS_OIDC_CLIENT_ID` client ID as configured in the OIDC server.
- `DAMAP_AUTH_SCOPE` scopes to request from the OIDC server.
- `DAMAP_AUTH_USER_ROLES_CLAIM_PATH` claim path in the token that will hold the user roles
- `DAMAP_AUTH_USER_ID_CLAIM` OIDC claim to use as a user ID
- `DAMAP_AUTH_NAME_CLAIM` OIDC claim that holds the full user name
- `DAMAP_AUTH_GIVEN_NAME_CLAIM` OIDC claim that holds the users given name
- `DAMAP_AUTH_FAMILY_NAME_CLAIM` OIDC claim that holds the users family name
- `DAMAP_AUTH_EMAIL_CLAIM` OIDC claim that holds the users mail
- `DAMAP_AUTH_AFFILIATIONS_CLAIM` The OIDC claim that holds the users affiliations (only for multitenant setup)
- `DAMAP_AUTH_ADMIN_ROLE_NAME` The OIDC claim that holds the users privileges

You can find a reference of all available configuration options in the [Configuration](../configuration/index.md) and [CRIS System Integration](../cris/index.md) sections.

For kubernetes based deployments, please view our [Helm chart](https://artifacthub.io/packages/helm/damap/damap-chart).

## Deploying with multitenancy

DAMAP offers the possibility to be set up as a multitenant capable application - meaning like a house that gets rented
out to multiple tenants, one instance can serve multiple universities.
This makes it highly efficient to onboard new universities, as existing infrastructure can simply be reused.
We advise to only use multitenancy in Kubernetes based deployments, as they offer better scalability and maintainability
than dockerized or baremetal deplyoments.
In addition, we also provide a [Helm chart](https://artifacthub.io/packages/helm/damap/damap-chart), which makes deployment
of DAMAP as a multitenant capable application easier by automating certain aspects.

To activate multitenant mode, set the `DAMAP_QUARKUS_PROFILE` environment variable to `multitenant,prod`.
For all other steps needed to configure multitenancy, refer to the [multitenancy documentation](../../configuration/multitenancy).

## Deploying with a read-only filesystem

DAMAP uses [Quarkus re-augmentation](https://quarkus.io/guides/reaugmentation) to switch database engines, which requires write permissions to the underlying filesystem. If you would like to deploy using a read-only filesystem, or with a user ID without permissions to write the filesystem (e.g. in OpenShift), you need to perform the following steps:

1. Deploy DAMAP with PostgreSQL or recompile the DAMAP backend with your database engine
2. Create a file named /quarkus-app/.db_kind containing the word `postgresql` (or your database engine) inside the container. You can do this using a mount point from the outside or as a `ConfigMap`/`Secret` in Kubernetes.

!!! warning
    Simply switching the database engine in the environment variables will not work with a read-only filesystem as parts of the code need to be recompiled!
