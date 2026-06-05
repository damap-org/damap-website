---
title: CRIS system integration
---

# CRIS system integration

This section details the integration configuration options you can pass when [deploying the backend](../deployment/backend.md). 

DAMAP has the following built-in CRIS integrations:

- [Elsevier Pure](pure.md)
- [ORCID](orcid.md)

You can also [develop your own integration](custom.md).

## Person database

| Environment variable     | Example Value                                 | Description                                                                  |
|---------------------------------------------|-----------------------------------------------|------------------------------------------------------------------------------|
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__DISPLAY_TEXT`  | University                                    | Text shown in the frontend to allow users to switch between person services. |
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__QUERY_VALUE`   | UNIVERSITY                                    | Should uniquely identify the service.                                        |
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__CLASS_NAME`    | org.damap.base.integration.university.service | Which java class should be used for the service implementation.              |


Possible values for `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__CLASS_NAME` are:

- `org.damap.base.integration.orcid.ORCIDPersonServiceImpl` for the [ORCID integration](orcid.md)
- `org.damap.base.integration.pure.PurePersonService` for the [Elsevier Pure integration](pure.md)
- Full class names for [custom integrations](custom.md)

!!! tip "_0__ structure in variables"
    The `_0__` in the environment variables is on purpose and cannot be omitted - yes even the double underscore `__`. They are necessary due to how the application process environment variables which get converted into lists.

!!! tip "Adding more than one person service"
    If you want to add a second person service, use the same variables but increment the number, like in this example: `DAMAP_TENANT_AWARE_PERSON_SERVICES_1__DISPLAY_TEXT`. DAMAP enforces at least one person service to be configured.

## Projects database

| Environment variable     | Example Value | Description                                                 |
|--------------------------|---------------|-------------------------------------------------------------|
| `DAMAP_TENANT_AWARE_PROJECT_SERVICE` | `default`     | Name of the projects service to consult for a project list. |

The projects service value defaults to `default`. This is a fallback from older DAMAP integrations that did not have an explicit configuration. Instead, an explicit qualifier should be preferred.

Possible values are:

- `default` or custom names for [custom integrations](custom.md)
- `pure` for the [Elsevier Pure integration](pure.md)
- `disabled` to run DAMAP without an integrated project service