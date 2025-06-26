---
title: Our plans for a shared DAMAP service
date: 2025-06-26
description: >
  In the recent community meeting we announced that we are currently working on what's essentially a cloud-hosted
  version of DAMAP. Here's what we know already and where we are headed.
---

# Our plans for a shared DAMAP service

We are working towards creating a cloud-hosted version of DAMAP that would potentially run on [ARI&Snet](https://forschungsdaten.at/arisnet/) and would allow anyone with an [eduID](https://www.aco.net/federation.html) or [ORCID](https://orcid.org/) to log in and start creating DMPs without having to deploy DAMAP on-site. In this post we want to go into more detail why we would like to take this step, what we are planning to do, and what this means for you as a DAMAP user.

<!-- more -->

## Deploying DAMAP is hard

The main feedback from institutions that have deployed DAMAP is that it's hard to deploy on-site. This was partially due to the lack of documentation, which we have addressed now with [the reference manual](../../manual/index.md). The other reason why it's hard are the several steps associated with setting up a new software such as finding the right person to talk to in IT, allocating time for setup and maintenance, and verifying the usefulness of the new acquisition, even if there is no purchase cost attached. Trialing a new tool or testing it as part of a coursework with students is decidedly hard when it involves a large amount of time commitment from other departments. 

Based on this feedback, we set out to make a new plan: create a multi-tenancy DAMAP version that's hosted publicly accessible to everyone. Instead of having to integrate the login systems for each university on each new DAMAP installation, we would make use of the already-existing identity federation among Austrian educational institutions from [ACOnet](https://www.aco.net/federation.html). To foster international collaboration, we also aim to add [ORCID login support](https://github.com/ORCID/ORCID-Source/blob/main/orcid-web/ORCID_AUTH_WITH_OPENID_CONNECT.md).

Where previously every institution had to do the same work of installing DAMAP and integrating their login system, with the cloud version we only need to do this work once. As an added benefit, in the shared instance you would be able to invite colleagues from other institutions as co-authors of your DMPs without having to ask for guest logins in your institution.

## Privacy and data security are key

While many DMPs are public, privacy and data security still remain key when putting something on the public Internet. The cloud platform we are planning to run *DAMAP Cloud* on is [ARI&Snet](https://forschungsdaten.at/arisnet/), which itself is hosted on [Exoscale](https://www.exoscale.com/), a Swiss/European cloud provider that prides itself on being a provider focused on data security and GDPR compliance. The cloud instance would be maintained by trained staff at [TU Wien](https://www.tuwien.at/).

When it comes to developing the software, we are already making all our code, tooling, and even this website [publicly available](https://github.com/damap-org). Our release pipelines are publicly visible and we will only deploy code that is available for inspection. We already use automated tests for our codebase and while developing the cloud version, we would increase the amount of tests we run, especially when it comes to checking the security boundaries of our software. In addition to that, we enforce a strict code review on any change that goes into DAMAP and conduct regular security audits internally.

As said before, we understand that putting your data in someone else's hands is not everyone's cup of Soda Zitrone, so your self-hosted DAMAP isn't going away. We will continue to support you running your own DAMAP instance, even on your own internal network behind a firewall if you so choose.

## DAMAP will remain customizable

The main appeal of DAMAP to many is the amount of customizations you can do: change the logo, colors, add your custom texts, then integrate it with your university's Current Research Information System (CRIS) to automatically populate project and staff data.

These customizations are an important part of the DAMAP ecosystem and we would like to keep offering them, even in the cloud version. However, there are some architectural changes required. Currently, customizations need an on-staff Java and Typescript developer to carry them out. Deploying a customized DAMAP requires rebuilding the application from source, which is not something we can do in the cloud version. As we are developing the cloud version, we would like to make these customizations available through an admin interface rather than through code.

In addition to customizations, we will also support integrations with existing systems in the stock (upstream) DAMAP version. One such integration already in the works is [Elsevier Pure](https://github.com/damap-org/damap-backend/pull/392), a CRIS that is widely used among universities. This will become available in DAMAP around the end of this summer. Having CRIS integrations directly in the upstream DAMAP version means if you are using a compatible system, you now no longer have to develop your own integration. We are also looking for other CRIS systems to integrate &mdash; if you are using any, let us know!

## When will it happen?

Turning DAMAP into a software that can host DMPs for many universities at once will take some work. We are hoping to complete this work over the course of the next year, depending on funding.

While not a multi-tenant system yet, we have already deployed the current version of DAMAP as part of a pilot project on ARI&Snet and have developed a [fully automated deployment tool (Helm chart)](https://github.com/damap-org/damap-backend/pull/393) to get DAMAP running in as little as 30 minutes. This is only possible due to a technology called [Kubernetes](https://kubernetes.io/), which makes the automation process significantly easier. (If you want to deploy DAMAP on your own Kubernetes cluster or on ARI&Snet, reach out to us at [&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;](&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;), we are happy to help.)

## Frequently asked questions

**Do you have funding for this development?**
:   We have funding generally for developing DAMAP and other DMP-related tools, but not yet for the cloud project. This is something we are working on and we will update you as the project progresses.

**Will I be able to nominate university data stewards who can access all DMPs in my institution?**
:   Yes! While this is not required, nominating a data steward will let you assist your researchers in creating DMPs, but also customize how *DAMAP Cloud* looks to your users. You can also set up integrations for your institution.

**Can people from other universities see my DMPs?**
:   Only if you make them public in DAMAP.

**Can I customize how my generated DMP documents look like?**
:   DAMAP comes with a set of document templates for funders in Austria already. Template customization is indeed one of the trickier parts of developing the cloud version, but we would definitely like to do it.

**How can I integrate my CRIS if DAMAP is running in the cloud?**
:   If your CRIS is accessible from the Internet, DAMAP should just be able to connect to it. You will likely need to ask IT for an API key, which you will have to provide to DAMAP. This lets DAMAP access your CRIS and fetch data from it. If your CRIS is not available from the Internet, you can either expose it to DAMAP only in your firewall, or you can upload regular data dumps to DAMAP.

**I have a custom CRIS we developed in-house. How can I integrate it?**
:   We will provide a documentation in a machine-readable form ([OpenAPI](https://swagger.io/specification/)), which you can use to add DAMAP support to your CRIS regardless of what programming language it is written in. We would also like to provide pre-built Software Development Kits (SDKs) for the more popular programming languages.

**Can people from other universities search my CRIS for people and projects?**
:   Absolutely not. Your CRIS is yours and yours alone. Only people who are part of your institution can use it to look up people and projects.

**How will I be able to add colleagues from other universities then?**
:   You will be able to look up your colleagues by their ORCID.

**I have logins for multiple institutions. How will you manage permissions?**
:   If you have multiple logins, and you have connected them together, you will be asked to pick which institution you want to access when logging into *DAMAP Cloud*.

**I would like to import DMPs from other systems. Can I do that?**
:   We are currently working on creating a [common standard for DMPs](https://github.com/RDA-DMP-Common) as part of the [OSTrails project](https://ostrails.eu/), which will be supported in DAMAP. Once our work there finishes, you will be able to do that if your DMPs are in the common format.

**I want to move from our on-site deployment to the cloud. Can I do that?**
:   Certainly! The complexity of the migration depends on what customizations you have, but we would be happy to help you with that. Please reach out at [&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;](&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;)!

**I want to move from the cloud to an on-site deployment. Will it be possible?**
:   Yes! We are planning to add an export process where you can move all your data to an on-site installation. We will provide more updates as the cloud version develops.

**How can I stay in the loop?**
:   Please join the monthly community meetings (see [the front page for the calendar link](/)) or email us at [&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;](&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#100;&#97;&#109;&#97;&#112;&#46;&#111;&#114;&#103;) so we can add you to the DAMAP mailing list.
