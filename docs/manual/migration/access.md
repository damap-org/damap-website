# The New Permission System

Another noticeable change for everyday users in v5.0.0 is how editing permissions are granted.

### Why did this change?

In the past, if a user added a colleague's name to the DMP's "Contributors" list, the system automatically preloaded the user in the access management list.

However, after upgrading our authentication to be configurable, we cannot guarantee anymore that the ID we get from the Identity provider is the same as the one Contributors have in the CRIS system. This makes Contributors unusable for access management purposes, since they cant be reliably linked to users anymore.

- **Contributors** are now just metadata. They are the names of people involved in the research project, which will be printed on the final DMP document.
- **Access** is the actual, verifiable permission to open and edit the DMP in the software and is now only linked to the ID we get from the identity provider.

### How it works now

Because adding a contributor no longer preloads it, DMP owners must now manually invite their colleagues to collaborate.

Here is the new workflow for granting access:

1. **The Colleague Logs In:** Before a colleague can be invited to edit a DMP, they must log into DAMAP at least once. This allows the system to securely register them as users.
2. **The Owner Searches:** The DMP owner goes to the **Access** tab of their project and uses the search bar to find their colleague by name or email.
3. **The Owner Grants Access:** The owner selects the colleague and assigns them the "Editor" or "Owner" role.