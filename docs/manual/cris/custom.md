---
title: Custom CRIS integrations
---

# Custom CRIS integrations

Custom CRIS integrations require the rebuild of the [DAMAP backend](https://github.com/damap-org/damap-backend) from source. The easiest way to achieve this is to use the [included `Dockerfile`](https://github.com/damap-org/damap-backend/blob/next/Dockerfile) to build a container image.

## Person integrations

Person integrations allow your users to look up people from your institutional database. For this integration, you will need to implement the [`org.damap.base.integration.PersonService` interface](https://github.com/damap-org/damap-backend/blob/bitmotivator/pure/src/main/java/org/damap/base/integration/PersonService.java). This service returns a [`ContributorDO` object](https://github.com/damap-org/damap-backend/blob/next/src/main/java/org/damap/base/rest/dmp/domain/ContributorDO.java) based on your institutional database.

## Projects integration

Project integrations allow your users to select projects from your CRIS database. For this integration, you will need to implement the [`org.damap.base.integration.ProjectServiceProvider` interface](https://github.com/damap-org/damap-backend/blob/bitmotivator/pure/src/main/java/org/damap/base/integration/ProjectServiceProvider.java). This service returns a [`ProjectDO` object](https://github.com/damap-org/damap-backend/blob/next/src/main/java/org/damap/base/rest/dmp/domain/ProjectDO.java) based on your institutional database.