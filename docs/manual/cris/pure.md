---
title: Elsevier Pure integration
---

# Elsevier Pure integration

DAMAP comes with a built-in [Elsevier Pure](https://www.elsevier.com/products/pure) integration. This provides both the ability to look up people and to look up projects from DAMAP.

## General configuration

| Environment variable                                                                    | Description                                                                                                                                                                      |
|-----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_DESCRIPTION_CLASSIFICATION`                           | Project description classification in Pure. Should start with `/dk/atira/pure/...`.                                                                                              |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_CONTRIBUTOR_ROLE_CLASSIFICATIONS_0__PURE_ROLE_URI`    | Pure role URI like `/dk/atira/pure/member`, should be mapped to a DAMAP role.                                                                                                    |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_CONTRIBUTOR_ROLE_CLASSIFICATIONS_0__CONTRIBUTOR_ROLE` | The DAMAP role the above Pure role maps to.                                                                                                                                      |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_PROJECT_LEAD_ROLE_CLASSIFICATION`                     | The Pure classification for project leads. Should start with `/dk/atira/pure/...`.                                                                                               |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_BACKEND`                                              | Set this to `http` to use a HTTP server, or to `file` to read from files. In production, its advised to use the `http` backend and only rely on `file` if there is no other way. |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_ENDPOINT_URL`                                         | HTTP endpoint URL when using the `http` backend. Not necessary when `file` backend is used.                                                                                      |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_API_KEY`                                              | API key to use for the `http` backend. Not necessary when `file` backend is used.                                                                                                |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_PROJECTS_FILE`                                        | The path to the file containing the projects in JSON format for the `file` backend. Must start with `file:/`.                                                                    |
| `DAMAP_TENANT_AWARE_ELSEVIER_PURE_PERSONS_FILE`                                         | The path to the file containing the persons in JSON format for the `file` backend. Must start with `file:/`.                                                                     |

!!! note "DAMAP roles"
    DAMAP supports the following roles: `DATA_COLLECTOR`, `DATA_CURATOR`, `DATA_MANAGER`, `DISTRIBUTOR`, `EDITOR`, `HOSTING_INSTITUTION`, `PRODUCER`, `PROJECT_LEADER`, `PROJECT_MANAGER`, `PROJECT_MEMBER`, `REGISTRATION_AGENCY`, `REGISTRATION_AUTHORITY`, `RELATED_PERSON`, `RESEARCHER`, `RESEARCH_GROUP`, `RIGHTS_HOLDER`, `SPONSOR`, `SUPERVISOR`, `WORK_PACKAGE_LEADER`, `PRINCIPAL_INVESTIGATOR`, `PROJECT_COORDINATOR`, `OTHER`.

!!! tip "_0__ structure in variables"
    The `_0__` in the environment variables is on purpose and cannot be omitted - yes even the double underscore `__`. They are necessary due to how the application process environment variables which get converted into lists.

!!! tip "Adding additional role mappings"
    If you want to add more role mappings, use the same variables but increment the number, like in this example: `DAMAP_TENANT_AWARE_ELSEVIER_PURE_CONTRIBUTOR_ROLE_CLASSIFICATIONS_1__PURE_ROLE_URI`.

## Setting up the project database

To set up Pure as a project database, set the `DAMAP_TENANT_AWARE_PROJECT_SERVICE` to `elsevier-pure`.

## Setting up as a persons database

To set up Pure as a persons database, set the following environment variables:

- `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__DISPLAY_TEXT` to the text which gets displayed in the frontend when picking the service type, defaults to `University`
- `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__QUERY_VALUE` to `PURE`
- `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__CLASS_NAME` to `org.damap.base.integration.pure.PurePersonService`