---
title: Customizing texts
---

# Customizing texts

DAMAP provides a built-in text customization interface that allows administrators to customize text / translations at runtime through the Admin Page -> Translations Page.

## Page structure

The page features multiple parts: **Filters**, **Actions**, **Results**, and **Editor**.

![Page Structure](../texts-media/page.png)

## Thought process

Every DAMAP deployment begins with the English language out of the box. This means users can select it in the sidebar. An admin can do one of the following two things:

1. Change some text for the English language
2. Create an entire new language

## Changing text

The simplest use case is customizing a specific piece of text somewhere in the application. The admin can copy the text and paste it into the **Filters** section, in the `Search by key or text` input field, as follows:

![Text Selection and Input](../texts-media/text-selection-and-input.png)

In the results table, you should see entries that correspond to pieces of text in the application. Clicking on one of these entries opens the **Editor** section:

![Editor Section](../texts-media/editor-open.png)

### Text values

The English language has default values for every piece of text on the website. **Default values cannot be changed and the English language cannot be deleted**. This ensures that pieces of text cannot be lost forever.

An admin can however override the default values by setting custom ones in the **Editor** section. This means that the website chooses the custom value first and, if there is none, it uses the default value. The "Revert to Default" button will remove this custom value and the website will display the default one again. Adding a custom value looks like this:

![Editor Section Changed Text](../texts-media/editor-changed-text.png)
_Notice that in the greeting, the text "let's get started!" has changed to "let's begin!"._

### Text keys

Every piece of text on the website has a unique key attributed to it. In the previous photo, the "let's get started!" text has the key **"admin.dashboard.title"**. Every key has been chosen such that anyone can quickly understand where that piece of text is located in the application. In this case, it translates to "On the admin page -> in the dashboard -> the title".

These keys allow for simpler sorting and filtering. If an admin wants to modify the whole **Admin Page**, they can use the **Filters** section to display all text snippets related to that page/key/section:

![Filter By Key](../texts-media/filter-by-key.png)

### Further filtering

The last filter allows admins to show only those snippets of text that have (not) been modified:

![Filter By Custom](../texts-media/filter-by-custom.png)
_Notice that the table shows custom values in bold so they are easier to spot._

## Adding a language

The second big feature of the translations panel is the ability to add languages.
In the **Actions** section, by clicking on "Add language", the admin can input a language code, like "FR" or "ES", and add it to the system:

![Add Language](../texts-media/add-language.png)

This creates a new language with the same default values as English. This means that, at first, switching from English to the new language and back will not change anything. However, the admin can modify the custom values for this new language, which allows for a full translation of the website:

![New Language](../texts-media/new-language.png)
![Old Language](../texts-media/old-language.png)
_Notice that the greeting changes based on the language selected in the sidebar._

This new language is enabled by default, which means that users can select it in the sidebar and see the custom values. If the admin disables it, users will not be able to select it and will only see the default values (which are the same as English). This allows admins to work on a translation without making it public until it's ready (the admin can still select it in the sidebar for testing). This is what a deactivated language looks like:

![Deactivated Language](../texts-media/deactivated-language.png)
_Notice that all texts appear as their keys, except for the greeting, which is a custom value that has been set for this language._

## Removing a language

Every language can be completely deleted, except for English. This is a non-reversible action, so be careful when doing it. If the language might be needed again in the future, it's better to just deactivate it instead of deleting it. Every language, including English, can be deactivated, but the system enforces that at all times at least one language is active, so English cannot be deactivated if it's the only active language. This ensures that users can always select a language in the sidebar and see some text on the website.
