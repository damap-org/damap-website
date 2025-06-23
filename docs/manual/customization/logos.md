---
title: Customizing logos
---

# Customizing logos

If you would like to customize the logos on your DAMAP instance, you must provide the logos in the following formats:

- `logo_cropped.svg`: 635x124 pixel SVG ([example](https://damap.it.tuwien.ac.at/assets/logo-cropped.svg))
- `logo.svg`: 842x595 pixel SVG ([example](https://damap.it.tuwien.ac.at/assets/logo.svg))

## Method 1: Mounting it in the container

This method mounts the logos into the container from the outside. The correct mount paths are:

- `/usr/lib/nginx/html/assets/logo-cropped.svg`
- `/usr/lib/nginx/html/assets/logo.svg`

## Method 2: Rebuilding the container

You can replace the assets [in the `damap-frontend/tree/next/apps/damap-frontend/src/assets` folder in the frontend code](https://github.com/damap-org/damap-frontend/tree/next/apps/damap-frontend/src/assets) and rebuild the frontend from source.