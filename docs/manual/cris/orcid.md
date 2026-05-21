---
title: ORCID integration
---

# ORCID integration

DAMAP supports looking up people by their ORCID ID in the person search form. To use this integration, simply add the following segment to the [persons integration configuration](../cris/index.md):

| Environment variable                                 | Value                                                    |
|------------------------------------------------------|----------------------------------------------------------|
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__DISPLAY_TEXT` | ORCID                                                    |
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__QUERY_VALUE`  | ORCID                                                    | 
| `DAMAP_TENANT_AWARE_PERSON_SERVICES_0__CLASS_NAME`   | org.damap.base.rest.persons.orcid.ORCIDPersonServiceImpl |


Note that ORCID does not provide a projects integration.