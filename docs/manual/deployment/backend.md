---
title: Deploying the DAMAP backend
---

# Deploying the DAMAP backend

The DAMAP backend is a Java application written for Quarkus. We currently only support containerized deployments and recommend using the `ghcr.io/damap-org/damap-backend:next` image unless you have created a custom CRIS integration that needs recompilation.

You can pass all configuration options to the DAMAP backend using environment variables. Please see the [Configuration](../configuration/index.md) and [CRIS System Integration](../cris/index.md) sections for details on available configuration options.

## Minimum configuration

At the very least, you will need to provide the following environment variables for DAMAP to work:

- `QUARKUS_DATASOURCE_JDBC_URL` in the format of `jdbc:postgresql://SERVERNAME:5432/DATABASENAME`.
- `QUARKUS_DATASOURCE_JDBC_DRIVER` containing the driver of your database (e.g. org.postgresql.Driver)
- `QUARKUS_DATASOURCE_DB_KIND` as your database engine name (e.g. `postgresql`).
- `QUARKUS_HIBERNATE_ORM_DIALECT` containing the Hibernate dialect (e.g. `org.hibernate.dialect.PostgreSQLDialect`).
- `QUARKUS_DATASOURCE_USERNAME` and `QUARKUS_DATASOURCE_PASSWORD` with your database credentials
- `QUARKUS_HTTP_CORS_ORIGINS` containing the valid origin URLs for your frontend.
- `QUARKUS_OIDC_AUTH_SERVER_URL` containing the OIDC server URL the backend should use.
- `QUARKUS_OIDC_TOKEN_ISSUER` containing the user-accessible OIDC URL.
- `QUARKUS_OIDC_CLIENT_ID` client ID as configured in the OIDC server.
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

## Deploying with a read-only filesystem

DAMAP uses [Quarkus re-augmentation](https://quarkus.io/guides/reaugmentation) to switch database engines, which requires write permissions to the underlying filesystem. If you would like to deploy using a read-only filesystem, or with a user ID without permissions to write the filesystem (e.g. in OpenShift), you need to perform the following steps:

1. Deploy DAMAP with PostgreSQL or recompile the DAMAP backend with your database engine
2. Create a file named /quarkus-app/.db_kind containing the word `postgresql` (or your database engine) inside the container. You can do this using a mount point from the outside or as a `ConfigMap`/`Secret` in Kubernetes.

!!! warning
    Simply switching the database engine in the environment variables will not work with a read-only filesystem as parts of the code need to be recompiled!
