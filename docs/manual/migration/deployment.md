---
title: Deployment changes
---

# Deployment changes

With v5.0.0 we now officially only support dockerized and kubernetes based deployments.
Making changes in the codebase of your own deployment to customize the application won't be actively supported anymore.
Nothing stops you from doing it, but be aware of the risks - this might lead to overhead since you need to rebase
everytime a new version is released.

!!! note "Docker Setup"
    DAMAPs docker setup has gotten a rather big overhaul in v5.0.0. For more information view the
    [deployment documentation](../../deployment) and the further pages of this section.