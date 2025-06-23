---
title: Database configuration
hide:
    - toc
---

# Database configuration

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the overview](index.md), we provide both the environment variable for stock deployment and the `application.yaml` variant for recompilation.

| Environment variable        | application.yaml            | Description                                                                                |
|-----------------------------|-----------------------------|--------------------------------------------------------------------------------------------|
| `DAMAP_DATASOURCE_URL`      | `damap.datasource.url`      | The JDBC connect string in the format of `jdbc:postgresql://SERVERNAME:5432/DATABASENAME`. |
| `DAMAP_DATABASE_DB_KIND`    | `damap.dataasource.db_kind` | Your database engine kind (`postgresql` or `oracle`).                                      |
| `DAMAP_DATASOURCE_USERNAME` | `damap.datasource.username` | Username for database authentication.                                                      |
| `DAMAP_DATASOURCE_PASSWORD` | `damap.datasource.password` | Password for database authentication.                                                      |
| `DAMAP_DATASOURCE_DIALECT`  | `damap.datasource.dialect`  | Dialect for the Hibernate ORM. Defaults to `org.hibernate.dialect.PostgreSQLDialect`.      |

!!! warning
    We officially only support PostgreSQL as a database engine. Oracle is supported only on a best effort basis.

!!! warning
    A change in the database engine requires either recompilation from source or [re-augmentation](https://quarkus.io/guides/reaugmentation). The default DAMAP backend container does this automatically, but requires write access to the container root filesystem. For custom containers you may need to implement re-augmentation in your startup script.