---
title: ORCID integration
---

# ORCID integration

DAMAP supports looking up people by their ORCID ID in the person search form. To use this integration, simply add the following segment to the [persons integration configuration](../cris/index.md):

```json
[
  {
    "display-text": "ORCID",
    "query-value": "ORCID",
    "class-name": "org.damap.base.rest.persons.orcid.ORCIDPersonServiceImpl"
  }
]
```

Note that ORCID does not provide a projects integration.