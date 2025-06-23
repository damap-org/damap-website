---
title: Creating a database for DAMAP
---

# Creating a database for DAMAP

DAMAP officially supports PostgreSQL as a database engine. Other database engines like Oracle may work, but are not officially supported. If you can, please stick to PostgreSQL.

## Deploying PostgreSQL

If you do not have a PostgreSQL server running at your institution, the easiest way to deploy one is to use a container. We recommend deploying [the official PostgreSQL image](https://hub.docker.com/_/postgres/) from the Ddocker Hub community library.

## Creating a database

!!! tip
    If you deployed PostgreSQL specifically for DAMAP using the official container image, you will not need to perform this step.

If you are using a shared PostgreSQL instance with other applications, you will need to create a separate database as well as a separate user. Please check the [`CREATE DATABASE`](https://www.postgresql.org/docs/current/sql-createdatabase.html), the [`CREATE USER`](https://www.postgresql.org/docs/current/sql-createuser.html), and the [`GRANT`](https://www.postgresql.org/docs/current/sql-grant.html) commands.

!!! warning
    DAMAP must be able to modify the table structure, otherwise it will not be able to apply the database schema changes on startup. Make sure your user has sufficient privileges.
