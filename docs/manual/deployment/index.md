---
title: Deploying DAMAP
---

# Deploying DAMAP

This guide outlines the steps for successfully deploying DAMAP. However, for most cases we recommend creating a deployment manifest either based on the [DAMAP docker compose files](https://github.com/damap-org/damap-backend/tree/next/docker) or [the (currently experimental) Helm chart](https://github.com/damap-org/damap-backend/pull/393/files#diff-2226d5acee49c177d9a584ee188b27a0770596613a907abb6849c1b222d0889c).

## Step 1: create OIDC credentials

Before you begin your DAMAP deployment, make sure your OIDC server is configured properly.

[Read the documentation  :material-arrow-right-circle:{ .middle }](oidc.md)

## Step 2: create a database for DAMAP

DAMAP requires a database, preferably PostgreSQL, in order to work. You can use your existing PostgreSQL server or you can deploy a new one.

[Read the documentation  :material-arrow-right-circle:{ .middle }](database.md)

## Step 3: deploying Gotenberg (optional)

To create PDF previews, DAMAP uses [Gotenberg](https://gotenberg.dev/), an API server for PDF creation. This step is optional.

[Read the documentation  :material-arrow-right-circle:{ .middle }](gotenberg.md)

## Step 4: deploying the FITS service (optional)

In order to automatically detect dataset data types, DAMAP uses [FITS](https://github.com/Islandora/islandora_fits). This is an optional component.

[Read the documentation  :material-arrow-right-circle:{ .middle }](fits.md)

## Step 5: deploying the DAMAP backend

The DAMAP backend is the heart of the DAMAP application.

[Read the documentation  :material-arrow-right-circle:{ .middle }](backend.md)

## Step 6: deploying the DAMAP frontend

Deploying the DAMAP frontend is the last step of getting DAMAP running. 

[Read the documentation  :material-arrow-right-circle:{ .middle }](frontend.md)