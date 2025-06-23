---
title: Deploying the DAMAP backend
---

# Deploying the DAMAP backend

The DAMAP backend is a Java application written for Quarkus. We currently only support containerized deployments and recommend using the `ghcr.io/damap-org/damap-backend:next` image unless you have created a custom CRIS integration that needs recompilation.

You can pass all configuration options to the DAMAP backend using environment variables. Please see the [configuration section](../configuration/index.md) for details on available configuration options.

## Minimum configuration

At the very least, you will need to provide the following environment variables for DAMAP to work:

- `DAMAP_DATASOURCE_URL` in the format of `jdbc:postgresql://SERVERNAME:5432/DATABASENAME`.
- `DAMAP_DATABASE_DB_KIND` as your database engine name (e.g. `postgresql`).
- `DAMAP_DATASOURCE_DIALECT` containing the Hibernate dialect (e.g. `org.hibernate.dialect.PostgreSQLDialect`).
- `DAMAP_DATASOURCE_USERNAME` and `DAMAP_DATASOURCE_PASSWORD` with your database credentials
- `DAMAP_ORIGINS` containing the valid origin URLs for your frontend.
- `DAMAP_AUTH_BACKEND_URL` containing the OIDC server URL the backend should use.
- `DAMAP_AUTH_FRONTEND_URL` containing the user-accessible OIDC URL.
- `DAMAP_AUTH_BACKEND_CLIENT` containing the OIDC client ID the backend should use.
- `DAMAP_AUTH_FRONTEND_CLIENT` containing the OIDC client ID the backend should use.

You can find a reference of all available configuration options in the [configuration section](../configuration/index.md).

## Deploying with a read-only filesystem

DAMAP uses [Quarkus re-augmentation](https://quarkus.io/guides/reaugmentation) to switch database engines, which requires write permissions to the underlying filesystem. If you would like to deploy using a read-only filesystem, or with a user ID without permissions to write the filesystem (e.g. in OpenShift), you need to perform the following steps:

1. Deploy DAMAP with PostgreSQL or recompile the DAMAP backend with your database engine
2. Create a file named /quarkus-app/.db_kind containing the word `postgresql` (or your database engine) inside the container. You can do this using a mount point from the outside or as a `ConfigMap`/`Secret` in Kubernetes.

!!! warning
    Simply switching the database engine in the environment variables will not work with a read-only filesystem as parts of the code need to be recompiled!
