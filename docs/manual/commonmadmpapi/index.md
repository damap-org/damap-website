---
title: RDA Common maDMP API Implementation
---

# RDA Common maDMP API Implementation

DAMAP fully implements [v0.2.0](https://github.com/RDA-DMP-Common/common-madmp-api) of the RDA Common maDMP API, which is a common baseline API for exchanging machine actionable DMPs.
The full [RDA common maDMP API specification](https://rda-dmp-common.github.io/common-madmp-api/) is available on GitHub as an OpenAPI document.

DAMAP uses the [OSTrails Application Profile for maDMPs](https://docs.ostrails.eu/en/latest/commons/dmp/application-profile.html#rda-dmp-common-standard-for-madmp-extension)
to represent maDMPs.
The profile is a stricter extension of the [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard),
while still staying compliant with it.
This allows DAMAP to support the profile's additional requirements while maintaining compatibility with the Common maDMP API.

The Common API at DAMAP is currently used internally to export DMPs as JSON maDMPs.
It is accessible at the relative path `/api/rda`, appended to the specific host URL.
Below is a short overview of all endpoints:

- `GET /api/rda/dmps` Search DMPs
- `POST /api/rda/dmps` Create DMPs
- `GET /api/rda/dmps/{id}` Get a DMP
- `PUT /api/rda/dmps/{id}` Overwrite a DMP
- `DELETE /api/rda/dmps/{id}` Delete a DMP

Below are example curl requests:

```bash
curl -X GET \
  "https://<host>/api/rda/dmps/<dmp_id>" \
  -H "Authorization: Bearer <access_token>" \
  -H "Accept: application/vnd.org.rd-alliance.dmp-common.v1.2+json"
```

```bash
curl -X PUT \
  "https://<host>/api/rda/dmps/<dmp_id>" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/vnd.org.rd-alliance.dmp-common.v1.2+json" \
  -H "Accept: application/vnd.org.rd-alliance.dmp-common.v1.2+json" \
  -H "If-Unmodified-Since: 2026-10-02T08:30:00Z" \
  -d '<maDMP_object>'
```

!!! note
    Accept and Content-Type headers should always be set to 'application/vnd.org.rd-alliance.dmp-common.v1.2+json'.

!!! warning
    PUT operations should always include the `If-Unmodified-Since` header to protect against concurrent modifications. The value should be taken from the `Last-Modified` header returned by the previous response.





