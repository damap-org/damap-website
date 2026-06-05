---
title: Database configuration
hide:
    - toc
---

# Database configuration

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md).

| Environment variable | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| `DAMAP_DB_HOST`      | Host of the database, no traling slash or protocol (http/https) |
| `DAMAP_DB_NAME`      | Name of the database.                                           |
| `DAMAP_DB_PORT`      | Port of the database.                                           |
| `DAMAP_DB_KIND`      | Your database engine kind (`postgresql` or `oracle`).           |
| `DAMAP_DB_USERNAME`  | Username for database authentication.                           |
| `DAMAP_DB_PASSWORD`  | Password for database authentication.                           |

!!! warning
    We officially only support PostgreSQL as a database engine. Oracle is supported only on a best effort basis.
    If you wish to use a different database engine like MySQl, you will need to rewrite the [entrypoint script](https://github.com/damap-org/damap-backend/blob/next/docker/docker-entrypoint.sh).

!!! warning
    A change in the database engine requires either recompilation from source or [re-augmentation](https://quarkus.io/guides/reaugmentation). The default DAMAP backend container does this automatically, but requires write access to the container root filesystem. For custom containers you may need to implement re-augmentation in your startup script.