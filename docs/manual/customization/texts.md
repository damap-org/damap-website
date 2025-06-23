---
title: Customizing texts
---

# Customizing texts

If you would like to change the texts in the frontend, you can do so by preparing [the translation files](https://github.com/damap-org/damap-frontend/tree/next/apps/damap-frontend/src/assets/i18n). You can supply these to the frontend to change the texts.

## Method 1: mounting the files

You can mount the translation files directly in the container. Mount your prepared `i18n` directory in `/usr/lib/nginx/html/assets/i18n`.

## Method 2: recompiling the frontend

You can als place the translation files in the `apps/damap-frontend/src/assets/i18n` folder in the frontend code and recompile the frontend from source.