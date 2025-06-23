---
title: CRIS system integration
---

# CRIS system integration

This section details the configuration options you can pass when [deploying the backend](../deployment/backend.md). As described [in the configuration overview](../configuration/index.md), we provide both the environment variable for stock deployment and the `application.yaml` variant for recompilation.

!!! warning
    The settings described on this page are not yet available in a DAMAP release. See [this pull request](https://github.com/damap-org/damap-backend/pull/392).

DAMAP has the following built-in CRIS integrations:

- [Elsevier Pure](pure.md) *(pending release)*
- [ORCID](orcid.md)

You can also [develop your own integration](custom.md).

## Person database

| Environment variable    | application.yaml        | Description                                                                                   |
|-------------------------|-------------------------|-----------------------------------------------------------------------------------------------|
| `DAMAP_PERSON_SERVICES` | `damap.person.services` | A JSON-formatted string containing a list of services providing a person database to consult. |

This configuration option is a JSON-formatted string with the following fields:
```json
[
  {
    "display-text": "University",
    "query-value": "UNIVERSITY",
    "class-name": "org.damap.base.integration.pure.PurePersonService"
  }
]
```

Possible values for `class-name` are:

- `org.damap.base.integration.orcid.ORCIDPersonServiceImpl` for the [ORCID integration](orcid.md)
- `org.damap.base.integration.pure.PurePersonService` for the [Elsevier Pure integration](pure.md)
- Full class names for [custom integrations](custom.md)

## Projects database

| Environment variable     | application.yaml         | Description                                                 |
|--------------------------|--------------------------|-------------------------------------------------------------|
| `DAMAP_PROJECTS_SERVICE` | `damap.projects-service` | Name of the projects service to consult for a project list. |

The projects service value defaults to `default`. This is a fallback from older DAMAP integrations that did not have an explicit configuration. Instead, an explicit qualifier should be preferred.

Possible values are:

- `default` or custom names for [custom integrations](custom.md)
- `pure` for the [Elsevier Pure integration](pure.md)