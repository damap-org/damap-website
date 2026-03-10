---
title: User & Collaboration Management
---

# Workflow changes

A noticeable change for everyday users in v5.0.0 is how editing permissions are granted.

### Why did this change?

In the past, if a user added a colleague's name to the DMP's "Contributors" list, the system automatically prelaoded the user in the access management list with "NO_RIGHTS" permissions. This meant that the colleague could easily be upgraded to "Editor".

However, after upgrading our authentication to use the EduID federation, there no longer is a guarantee, that for each user, we get their actual university/employee ID. For privacy reasons, randomized IDs (pairwise IDs) are used for user accounts rather than public employee numbers. Because DAMAP can no longer safely guarantee that a given ID from a CRIS system matches a specific, private login account (through the EduID federation), the system no longer is able to automaticly preload the list based on the Contributors list.

- **Contributors** are just metadata. They are the names of people involved in the research project, which will be printed on the final DMP document. The ID can for instance come from a CRIS system and is identical for the employee across all systems.
- **Access** is the actual, verifiable permission to open and edit the DMP in the software. The ID for access management is the one from the login system, which does not always match the one from the Contributor.

### How it works now

Because adding a contributor no longer preloads it, DMP owners must now manually invite their colleagues to collaborate.

Here is the new workflow for granting access:

1. **The Colleague Logs In:** Before a colleague can be invited to edit a DMP, they must log into DAMAP at least once. This allows the system to securely register them as users.
2. **The Owner Searches:** The DMP owner goes to the **Access** tab of their project and uses the search bar to find their colleague by name or email.
3. **The Owner Grants Access:** The owner selects the colleague and assigns them the "Editor" or "Owner" role.
