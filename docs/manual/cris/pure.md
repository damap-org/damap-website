---
title: Elsevier Pure integration
---

# Elsevier Pure integration

!!! warning
    The settings described on this page are not yet available in a DAMAP release. See [this pull request](https://github.com/damap-org/damap-backend/pull/392).

DAMAP comes with a built-in [Elsevier Pure](https://www.elsevier.com/products/pure) integration. This provides both the ability to look up people and to look up projects from DAMAP.

## General configuration

| Environment variable                                    | application.yaml                                       | Description                                                                                                   |
|---------------------------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `DAMAP_ELSEVIER_PURE_DESCRIPTION_CLASSIFICAITON`        | `damap.elsevier-pure-description-classification`       | Project description classification in Pure. Should start with `/dk/atira/pure/...`.                           |
| `DAMAP_ELSEVIER_PURE_CONTRIBUTOR_ROLE_CLASSIFICATIONS`  | `damap.elsevier-pure-contributor-role-classifications` | A JSON-formatted key-value map of Pure classifications mapped to DAMAP roles (see below).                     |
| `DDAMAP_ELSEVIER_PURE_PROJECT_LEAD_ROLE_CLASSIFICATION` | `damap.elsevier-pure-project-lead-role-classification` | The Pure classification for project leads. Should start with `/dk/atira/pure/...`.                            |
| `DAMAP_ELSEVIER_PURE_BACKEND`                           | `damap.elsevier-pure-backend`                          | Set this to `http` to use a HTTP server, or to `file` to read from files.                                     |
| `DAMAP_ELSEVIER_PURE_ENDPOINT_URL`                      | `damap.elsevier-pure-endpoint-url`                     | HTTP endpoint URL when using the `http` backend.                                                              |
| `DAMAP_ELSEVIER_PURE_API_KEY`                           | `damap.elsevier-pure-api-key`                          | API key to use for the `http` backend.                                                                        |
| `DAMAP_ELSEVIER_PURE_PROJECTS_FILE`                     | `damap.elsevier-pure-projects-file`                    | The path to the file containing the projects in JSON format for the `file` backend. Must start with `file:/`. |
| `DAMAP_ELSEVIER_PURE_PERSONS_FILE`                      | `damap.elsevier-pure-persons-file`                     | The path to the file containing the persons in JSON format for the `file` backend. Must start with `file:/`.  |

!!! note "DAMAP roles"
    DAMAP supports the following roles: `DATA_COLLECTOR`, `DATA_CURATOR`, `DATA_MANAGER`, `DISTRIBUTOR`, `EDITOR`, `HOSTING_INSTITUTION`, `PRODUCER`, `PROJECT_LEADER`, `PROJECT_MANAGER`, `PROJECT_MEMBER`, `REGISTRATION_AGENCY`, `REGISTRATION_AUTHORITY`, `RELATED_PERSON`, `RESEARCHER`, `RESEARCH_GROUP`, `RIGHTS_HOLDER`, `SPONSOR`, `SUPERVISOR`, `WORK_PACKAGE_LEADER`, `PRINCIPAL_INVESTIGATOR`, `PROJECT_COORDINATOR`, `OTHER`.

## Setting up the project database

To set up Pure as a project database, set the `DAMAP_PROJECTS_SERVICE` to `pure`.

## Setting up as a persons database

To set up Pure as a persons database, add the following entry to the`DAMAP_PERSON_SERVICE` setting:

```json
[
  {
    "display-text": "University",
    "query-value": "UNIVERSITY",
    "class-name": "org.damap.base.integration.pure.PurePersonService"
  }
]
```