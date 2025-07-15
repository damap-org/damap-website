---
title: An early look at the common DMP API
date: 2025-07-15
description: >
  Normally, an API is not an exciting topic to read about. It is meant to plug two pieces of software together. However, much like a guitarist plugging in their instrument, the new common standard DMP API will let you do a lot more with your DMPs than before. In this blog post, we are taking a first look at the standard multiple DMP tool makers are working on as part of the OSTrails project and how it affects DAMAP.
---

Normally, an API is not an exciting topic to read about. It is meant to plug two pieces of software together. However, much like a guitarist plugging in their instrument, the new common standard DMP API will let you do a lot more with your DMPs than before. In this blog post, we are taking a first look at the standard that multiple DMP tool makers are working on as part of the [OSTrails project](https://ostrails.eu/dmps) and how it affects DAMAP.

<!-- more -->

!!! tip "An AP... whatnow?"
    An API (Application Programming Interface) is a common language between a set of computer programs, such as DMP-related tools. If two programs speak the same language (API), they can exchange data. Unlike human language, APIs need to have very strict grammar rules how to format the data. Both parties in an exchange must follow these rules precisely.
    
    The best way to think about an API is like a power plug and a power socket. Your toaster does not care what the wiring in the wall looks like, and the wiring does not care what you plug into the socket (within reason). All that matters is that the socket and plug fit together perfectly, following the strict rules of the applicable standard ([CEE 7](https://en.wikipedia.org/wiki/CEE_7_standard_AC_plugs_and_sockets) for EU sockets, for example).

## A common language for tools&hellip; and funders

The advent of computers promised us a future with less paperwork, not more. When you, for example, upload a dataset to your in-house data repository such as [Invenio RDM](https://inveniosoftware.org/products/rdm/), *should it not automatically update your corresponding DMP*? Of course it should!

However, with the number of DMP-related tools out there, creating integrations for all of them would have been an exercise in futility. Before the common DMP API, there was no common language these tools could speak and each tool would have needed its own integration. Some DMP tools had their own APIs, but these were not compatible with each other. An integration that worked with one tool would not work with other tools since they had a different API.

Enter the [RDA DMP Common Standard and the Common API Working Groups](https://github.com/RDA-DMP-Common) comprised of members from several popular DMP tool makers, working on two new standards: the **common data format** and the **common API**. These standards aim to provide a baseline data format to exchange DMP data between various tools.

The [*common data format*](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) (currently at version 1.1) describes what a machine-actionable DMP should look like: where do the collaborators, datasets, and other parts of a DMP go, what fields they need to have, and so on. In the future, you could take a DMP file in this *common format*, attach it to a human-readable PDF and send it to a funder. If the funder has a tool that can read the *common format*, they will be able to automatically evaluate parts of your DMP for their criteria, [which is something OSTrails is working on](https://github.com/OSTrails/DMP-Evaluation-Service).

The [*common API*](https://github.com/RDA-DMP-Common/common-madmp-api) (currently in development) is an extension of the *common data format*. It describes a way DMP tools can exchange their DMP documents over the network without human intervention. Without it, you would have to manually download the DMP from one tool and upload it to the other. With it, your repository will be able to update your DMP, or your DMP tool could automatically link the costs to your finance management system. In the future, a funder may even be able to access the DMPs directly from your DMP tool using this API.

Machine-actionable DMPs are not new, but only standardization will make large-scale adoption possible. A [wide body of research](https://scholar.google.com/scholar?q=machine-actionable+data+management+plan) already exists on the topic and on a more practical note, there exists a [DAMAP-Invenio integration](https://github.com/fair-data-austria/invenio-damap) relying on a non-standard API. This integration will update your DMP with the datasets uploaded to Invenio. Unfortunately, it will only work between Invenio and DAMAP and other tools will not benefit from it. The situation is similar for other DMP-related tools since they only support a tool-specific, non-standard API.

Hence, there is no large ecosystem of automated analysis and processing tools that work with machine-actionable DMPs across systems today. DMPs are frequently distributed as text documents without the possibility for automation. Having a common standard for DMPs will make it possible to build such a large ecosystem and allow for freely exchanging DMPs between automated systems.

## Meta-Machine-Actionable: OpenAPI code generation

Mentioning standards often evokes pictures of endless text documents that cannot easily be acted upon. While [many standards are like that](https://www.rfc-editor.org/), newer systems like [JSON schema](https://json-schema.org/) and [OpenAPI](https://www.openapis.org/) let us accurately describe data formats and APIs in a way that we can then automatically generate code from them. In other words, our API documentation is now machine-actionable.

Of course, such machine actionability is not without its challenges. Not every OpenAPI document is automatically machine-actionable: the standard does not force you to fill out every field and provide every detail needed to generate *useful* code. Additionally, the OpenAPI standard is so large that many tools don't implement everything. Creating a machine-actionable API document involves a great deal of trial-and-error to create something usable.

It would be ideal, for example, to reuse the *common data format* (written in [JSON schema](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/blob/master/examples/JSON/JSON-schema/1.2/maDMP-schema-1.2.json)) inside the *common API* (written in [OpenAPI](https://github.com/RDA-DMP-Common/common-madmp-api/pull/3)). While theoretically possible and allowed by the OpenAPI standard as of version 3.1, most code generators don't properly support integrating these two technologies and often generate nonsensical code.

As a result, the focus of the API working group is to deliver JSON schema and OpenAPI specifications that you can use to integrate with DMP tools by automatically generating much of the code needed.

## Using the common API in DAMAP and more

Integrations have always been a key feature in DAMAP, so we will support the *common data format* and the *common API* as soon as the specification files become fully viable for code generation. In other words, you will be able to use DAMAP with all common API-compatible tools without any further development work.

On top of implementing the *common API* in DAMAP, we are going one step further and will be using the *common data format* in other integrations as well. In our previous blog post, we wrote about [the need for a cloud version of DAMAP](our-plans-for-a-shared-damap-service.md), which will change how integrations and customizations work. In the current DAMAP version, we support creating custom CRIS integrations using Java code, which is a feature highly valued by institutions running in-house CRIS databases.

!!! tip "Who is CRIS?"
    CRIS (Current Research Information System) are institutional databases that hold information about the various research projects, people working on them, funding information, and so on. DAMAP can connect to your institutional CRIS to auto-populate parts of your DMP based on the information you already have.
    
    Many institutions have developed custom CRIS databases in-house and do not use a widely-available commercial system such as [Elsevier Pure](https://www.elsevier.com/products/pure). Using a standardized and well-documented API makes developing integrations for custom-built systems easier.

We will support creating such integrations in the cloud version using an OpenAPI document of our own, based on the *common data format*. Your CRIS integration running in your institution will be able to provide project and staff information using the *common data format*, which DAMAP will then consume when populating the DMP information. If you are interested in the technical details, [check out this pull request](https://github.com/damap-org/damap-backend/pull/401).

Once finished, we will publish the OpenAPI document and manuals for anyone who wants to create a compatible integration for DAMAP in our [reference manual](../../manual/index.md). Let us know if you are planning to provide a compatible integration, so we can list you as a compatible tool.

Another feature we are adding is support for the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service), which will give you feedback on your DMP directly in the DAMAP interface.

## Make your voice heard

What would help *you* in your daily work? Our monthly community calls are an *open forum* for all current and prospective DAMAP users to talk about ideas and challenges when working with DMPs. Your feedback is very valuable when deciding on the next feature to develop. The date and calendar link to the [next community call](../../index.md) are on the front page.

*This work was co-funded by the European Union under Horizon project OSTrails 101130187.*