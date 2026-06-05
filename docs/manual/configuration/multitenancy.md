---
title: Multitenancy
hide:
    - toc
---

# Multitenancy

To activate multitenancy mode, three things are needed

1. Set the `DAMAP_QUARKUS_PROFILE` environment variable to `multitenant,prod`
2. Prepare an [OIDC server](../authentication.md) that can provide affiliation informatio
3. Prepare a multitenancy configuration file
4. Create a database for each tenant


## OIDC server

The OIDC server needs to be able to supply an affiliation claim, so DAMAP can map the user to the fitting tenant database.
This affiliation claim should be unique per tenant university. 
From this claim, the tenant id is generated, by replacing every non-alphanumeric character with an `_` and removing
duplicates.
Its important to find your tenant id before you proceed to set up multitenancy.

## Multitenancy configuration file

To onboard new tenants, DAMAP loads a configuration file, which can sit outside the classpath. 
This enables reconfiguration without needing to build a new image by using [Quarkus re-augmentation](https://quarkus.io/guides/reaugmentation).
The location this file is loaded from is set by the `QUARKUS_CONFIG_LOCATIONS` env variable, which is set to
`/opt/damap/tenants.yaml` by default.

A sample [`tenants.yaml`](https://github.com/damap-org/damap-backend/blob/next/docker/tenants.yaml) is provided on GitHub.

| Field                            | Description                                                                                                                                                                                                                              |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `tenant-list`                    | A list containing all tenant ids.                                                                                                                                                                                                        |
| `tenant-configs`                 | Here you can provide different configurations options for each tenant. `tenant_1` in the example file is a standin for the tenant id. The possible configurations are all of those environemnt variables with the `TENANT_AWARE` prefix. |


!!! tip
    The [Helm chart](https://artifacthub.io/packages/helm/damap/damap-chart) provides automated support for generating this file.

!!! tip
    Instead of creating a `tenants.yaml` file, its also possible to supply environment variables for each configuration option.

## Creating new databases

Each tenant needs its own, separated database.
It's recommended to create a new database for each tenant in the same database server.
The new databases need to have the exact same database name as the tenants id, as described above.
If the database name and the tenant id don't match, Quarkus won't be able to redirect traffic to the correct database.

Additionally, every tenant needs the following configuration blocks added to the `tenants.yaml` file:

```
"%multitenant":
  quarkus:
    datasource:
      tenant_1:
        jdbc:
          url: jdbc:postgresql://damap-db:5432/tenant_1
          driver: ${quarkus.datasource.jdbc.driver}
        db-kind: ${quarkus.datasource.db-kind}
        username: ${quarkus.datasource.username}
        password: ${quarkus.datasource.password}

    liquibase:
      tenant_1:
        migrate-at-start: true
        change-log: org/damap/base/db/changeLog-root.yaml
```

Replace `tenant_1` with the tenant id and set the `jdbc.url` to your tenants database url. 

!!! warning
    The default DAMAP database (single tenant setup) is still needed, as Quarkus requires a "bootstrap" database
    to function in multitenancy mode.