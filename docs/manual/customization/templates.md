# Customizing templates

## 1. Overview and Usage

DAMAP exports DMPs to Microsoft Word (`.docx`) templates by replacing placeholders in a Word file with information the
user put in.
Placeholders look like text surrounded by square brackets, an example would be `[contact` or `[costs]`.

Admins can upload custom Word templates for exporting DMPs, by writing their own templates, using preexisting placeholders.
This feature is located in the **Admin Panel** under **Templates**.

All custom templates act as variations of the standard [Science Europe Template](https://github.com/damap-org/damap-backend/blob/next/src/main/resources/org/damap/base/template/scienceEuropeTemplate.docx).
In particular, this means they rely on the same placeholders (keys).
You can download it by following the link and clicking the 3 dots on the top right.

Custom templates that have previously been uploaded can also be deleted via the UI.
In addition to this, templates can be toggled active or inactive for all users of your DAMAP instance.
Setting a template to inactive disables exporting and previewing using that template.
At least one template needs to be active at all times, which is enforced automatically.

### How to Create a Custom Template
A custom template can be created using one of these two methods:

1. **Use the Science Europe base:** Download the default [Science Europe Template](https://github.com/damap-org/damap-backend/blob/next/src/main/resources/org/damap/base/template/scienceEuropeTemplate.docx) and make your changes directly within that file. This is the recommended method.
2. **Start fresh (Alternative):** Create a blank Word document, write your custom text, and carefully copy-paste the required placeholders and tables from the standard Science Europe template into your new document.

### Rules for Editing Templates
To ensure the system can successfully generate documents from your template, please observe the following rules:

**What you CAN do:**

- **Formatting:** Change fonts, colors, styling, and layout.
- **Custom Content:** Add your own static text, images, logos, or institutional branding.
- **Placeholders (Keys):** Move them around, duplicate them, or delete the ones you do not need.
- **Tables:** Move, delete, or copy entire predefined tables.

**What you CANNOT do:**

- **New Placeholders:** You cannot invent or add new placeholders. The system will not recognize them.
- **Placeholder Values:** You cannot change what data a placeholder represents. The data is always pulled directly from what the user enters in the DAMAP user interface.
- **Table Columns:** You cannot add or remove columns inside the predefined DAMAP data tables (doing so will break the table generation).

---

## 2. Available Placeholders (Keys)

You can place these placeholders anywhere in your document to display the corresponding information.

### Project Information
| Placeholder | Explanation                                                          |
| :--- |:---------------------------------------------------------------------|
| `[projectname]` | The full title of the project. (Automatically resized if very long). |
| `[acronym]` | The project acronym (e.g., "ARCOS").                                 |
| `[startdate]` | Expected start date of the project.                                  |
| `[enddate]` | Expected end date of the project.                                    |
| `[funderid]` | The unique identifier or name of the project funder.                 |
| `[grantid]` | The funding program name combined with the specific grant number.    |
| `[projectid]` | The internal university or institutional project ID.                 |

### People & Roles
| Placeholder        | Explanation |
|:-------------------| :--- |
| `[contact]`        | Full contact details for the person responsible for the DMP (Name, Email, ORCID, and Affiliation). |
| `[coordinator]`    | Full details of the Project Coordinator or Principal Investigator. |
| `[contributors]`   | A list of other project members involved in data management, including their roles. |
| `[storageintro]`   | A generated narrative stating who (by name or role) is responsible for data storage and whether it is managed internally or externally. |

### Data Description & Quality
| Placeholder | Explanation |
| :--- | :--- |
| `[produceddatadescription]` | A text block describing all newly produced datasets. |
| `[reuseddatadescription]` | A text block describing any existing datasets that are being reused. |
| `[datageneration]` | Explanation of how the data will be generated or collected. |
| `[documentation]` | Description of the documentation that accompanies the data. |
| `[metadata]` | Narrative explaining which metadata standards and vocabularies are used. |
| `[dataorganisation]` | Information on how data is structured and versioned (folders, file naming, etc.). |
| `[dataqualitycontrol]` | Description of the measures taken to ensure data quality. |
| `[datasetTechnicalResources]`| Lists any specific technical equipment or software required to handle the data. |

### Storage, Legal & Ethics
| Placeholder | Explanation |
| :--- | :--- |
| `[storage]` | Details of where the data is stored during the project, including descriptions of the specific servers or services used. |
| `[sensitivedata]` | Narrative regarding the handling of sensitive data, including security measures and authorized access. |
| `[personaldata]` | Explanation of how personal data (GDPR relevant) is handled and protected. |
| `[legalrestriction]` | Details on intellectual property rights, ownership, and any legal restrictions on data use. |
| `[ethicalissues]` | Narrative on ethical considerations and whether an ethics committee has reviewed the project. |
| `[repoinformation]` | Detailed description of the repositories used for long-term preservation, usually fetched from the re3data service. |
| `[closedrestricteddatasetreasons]` | Narrative explaining why certain datasets are not made public (closed or restricted access). |
| `[tools]` | Description of any specific tools or software needed to access or reuse the data. |

### Costs
| Placeholder | Explanation |
| :--- | :--- |
| `[costs]` | A general statement on whether data management costs are expected. |
| `[costtotal]` | The calculated total sum of all entered data management costs. |
| `[costcurrency]` | The currency code used for the costs (e.g., EUR). |
| `[costsDescriptions]` | Detailed descriptions for specific cost items (used for very long entries). |

---

## 3. Data Tables

The following tables generate dynamic rows based on lists of items. You can move these tables or delete them if they aren't needed, but **you must not add or remove columns**.

### New Dataset Table (`[datasetTable]`)
*   **Purpose:** Lists all datasets created during the project.
*   **Columns:** ID (e.g., P1), Title, Data Type, File Format, Estimated Volume, Sensitive Data (Yes/No), and Description.

### Reused Dataset Table (`[reusedDatasetTable]`)
*   **Purpose:** Lists all existing datasets that the project is building upon.
*   **Columns:** ID (e.g., R1), Title, Dataset Identifier (e.g., DOI), License, Sensitive Data (Yes/No), and Description.

### Data Access Table (`[datasetAccessTable]`)
*   **Purpose:** Summarizes who has access to the data during the research phase.
*   **Columns:** ID, Selected project members access, Other project members access, and Public access levels.

### Data Publication Table (`[datasetPublicationTable]`)
*   **Purpose:** Details how and when the data will be shared with the public.
*   **Columns:** ID, Access Type (Open/Restricted/Closed), Embargo Date (if applicable), Repository name, Persistent Identifier (PID), and License.

### Long-term Preservation Table (`[datasetRepositoryTable]`)
*   **Purpose:** Details where data will be stored after the project ends.
*   **Columns:** ID, Location (Repository), Minimum retention period, and Target audience.

### Dataset Deletion Table (`[datasetDeleteTable]`)
*   **Purpose:** Lists any data that will be deleted instead of preserved.
*   **Columns:** ID, Dataset Title, Date of deletion, Reason for deletion, and the Person responsible for the deletion.

### Cost Table (`[costTable]`)
*   **Purpose:** Provides a detailed breakdown of data management costs.
*   **Columns:** Cost Name, Category/Type, Description, Currency, and Value.
