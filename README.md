# Todo Drive Explorer Example

![Todo Drive Explorer](https://raw.githubusercontent.com/powerhouse-inc/todo-drive-explorer/9a87871e61460e73ddf8635fd756a0cd991306d6/todo-drive-explorer.png)

This example demonstrates how to create a Todo Drive Explorer application using the Powerhouse platform. The application allows users to create and manage todo lists with a visual progress indicator.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [License](#license)
- [Powerhouse CLI Commands Reference](#powerhouse-cli-commands-reference)
  - [The `use` Command](#the-use-command)
  - [The `update` Command](#the-update-command)
  - [Key Differences](#key-differences)
- [Using the Timeline Feature](#using-the-timeline-feature)
  - [Enabling the Timeline Feature](#enabling-the-timeline-feature)
  - [Implementation in Default Drive Explorer](#implementation-in-default-drive-explorer)
  - [Implementation in Custom Drive Explorer](#implementation-in-custom-drive-explorer)
  - [Handling Timeline Revisions in Document Editor](#handling-timeline-revisions-in-document-editor)

## Prerequisites

1. Update `ph-cmd` to the latest version:
   ```bash
   pnpm install -g ph-cmd@0.43.0-dev.1
   ```

2. Ensure you have the latest updates from the Powerhouse monorepo:
   ```bash
   git pull origin main
   ```

## Setup Instructions

1. Create a new project:
   ```bash
   ph init todo-demo --dev --package-manager pnpm
   ```

2. Create a Todo Document Model:
   - Start by connecting with `ph connect`
   - Run through the document modeling process
   - Alternatively, use the provided todo document model:
     - Download [todo.phdm.zip](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/todo.phdm.zip)
     - Place it in the project root
     - Generate the document model:
       ```bash
       ph generate todo.phdm.zip
       ```

3. Add the reducers code:
   - Copy the code from [base-operations.ts](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/document-models/to-do/src/reducers/base-operations.ts)
   - Paste it into `document-models/to-do/src/reducers/base-operations.ts`

4. Generate a document editor:
   ```bash
   ph generate --editor ToDoList --document-types powerhouse/todo
   ```

5. Add the editor code:
   - Copy the code from [editor.tsx](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/editors/to-do-list/editor.tsx)
   - Paste it into `editors/to-do-list/editor.tsx`

6. Generate a drive explorer app:
   ```bash
   ph generate --drive-editor todo-drive-explorer
   ```

7. Update the `powerhouse.manifest.json`:
   ```json
   {
     "name": "",
     "description": "",
     "category": "",
     "publisher": {
       "name": "Powerhouse",
       "url": "https://www.powerhouse.inc/"
     },
     "documentModels": [],
     "editors": [],
     "apps": [
       {
         "id": "todo-drive-explorer",
         "name": "Todo Drive App",
         "driveEditor": "todo-drive-explorer"
       }
     ],
     "subgraphs": [],
     "importScripts": []
   }
   ```

8. Set up the drive explorer app:
   - Remove unnecessary files:
     ```bash
     rm -rf editors/todo-drive-explorer/hooks
     rm -rf editors/todo-drive-explorer/components/FileItemsGrid.tsx
     rm -rf editors/todo-drive-explorer/components/FolderItemsGrid.tsx
     rm -rf editors/todo-drive-explorer/components/FolderTree.tsx
     ```

   - Create and populate the following files:

     a. Create `editors/todo-drive-explorer/types/todo.ts`:
     - Copy the code from [todo.ts](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/editors/todo-drive-explorer/types/todo.ts)

     b. Create `editors/todo-drive-explorer/components/ProgressBar.tsx`:
     - Copy the code from [ProgressBar.tsx](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/editors/todo-drive-explorer/components/ProgressBar.tsx)

     c. Create `editors/todo-drive-explorer/components/DriveExplorer.tsx`:
     - Copy the code from [DriveExplorer.tsx](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/editors/todo-drive-explorer/components/DriveExplorer.tsx)

     d. Update `editors/todo-drive-explorer/components/EditorContainer.tsx`:
     - Copy the code from [EditorContainer.tsx](https://github.com/powerhouse-inc/todo-drive-explorer/blob/ee63786fa8ceed71de63cd9c52f1795ad11ac403/editors/todo-drive-explorer/components/EditorContainer.tsx)
     - Or use the following code:

     ```typescript
     import {
       ToDo
     } from "../../../document-models/index.js"

     // ... existing imports ...

     const documentModelsMap = {
       [ToDo.documentModel.id]: ToDo,
       [documentModelDocumentModelModule.documentModel.id]:
         documentModelDocumentModelModule,
     };

     const documentEditorMap = {
       [ToDo.documentModel.id]: lazy(() =>
         import("../../to-do-list/index.js").then((m) => ({
           default: m.default.Component,
         })),
       ),
       [documentModelDocumentModelModule.documentModel.id]: lazy(() =>
         import("@powerhousedao/builder-tools/style.css").then(() =>
           import("@powerhousedao/builder-tools/document-model-editor").then(
             (m) => ({
               default: m.documentModelEditorModule.Component,
             }),
           ),
         ),
       ),
     } as const;
     ```

9. Start the application:
   ```bash
   ph connect
   ```

   ![Todo Drive Explorer Demo](https://raw.githubusercontent.com/powerhouse-inc/todo-drive-explorer/9a87871e61460e73ddf8635fd756a0cd991306d6/demo.gif)


## Project Structure

```
todo-demo/
├── document-models/
│   └── to-do/
│       └── src/
│           └── reducers/
│               └── base-operations.ts
├── editors/
│   ├── to-do-list/
│   │   └── editor.tsx
│   └── todo-drive-explorer/
│       ├── components/
│       │   ├── DriveExplorer.tsx
│       │   ├── EditorContainer.tsx
│       │   └── ProgressBar.tsx
│       └── types/
│           └── todo.ts
└── powerhouse.manifest.json
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Powerhouse CLI Commands Reference

### The `use` Command

The `use` command allows you to switch between different environments for your Powerhouse project dependencies.

#### Basic Syntax
```bash
ph use <environment> [localPath]
```

#### Available Environments
- `latest` - Uses the latest stable version of all Powerhouse packages
- `dev` - Uses development versions of the packages
- `prod` - Uses production versions of the packages
- `local` - Uses local versions of the packages from a specified path

#### Examples
```bash
# Switch to latest stable versions
ph use latest

# Switch to development versions
ph use dev

# Use local versions from a specific path
ph use local /path/to/local/packages

# Use a specific package manager
ph use latest --package-manager pnpm
```

### The `update` Command

The `update` command allows you to update your Powerhouse dependencies to their latest versions based on the version ranges specified in your `package.json`.

#### Basic Syntax
```bash
ph update [options]
```

#### Examples
```bash
# Update dependencies based on package.json ranges
ph update

# Force update to latest dev versions
ph update --force dev

# Force update to latest stable versions
ph update --force prod

# Use a specific package manager
ph update --package-manager pnpm
```

### Key Differences
1. The `use` command is for switching between different environments, while the `update` command is for updating dependencies within your current environment.
2. The `use` command requires you to specify an environment, while the `update` command is optional with its parameters.
3. The `use` command can work with local packages, while the `update` command is focused on updating remote package versions.

Both commands support multiple package managers (npm, yarn, pnpm, and bun) and will automatically detect your project's package manager based on the lockfile present in your project directory.

## Using the Timeline Feature

The timeline feature allows users to view document history and navigate through different revisions of a document.

### Enabling the Timeline Feature

To enable the timeline feature in your document editor, you need to set `timelineEnabled: true` in your editor module configuration:

```typescript
// editors/to-do-list/index.ts
export const module: EditorModule<ToDoDocument> = {
  Component: Editor as unknown as FC<EditorProps<ToDoDocument> & Record<string, unknown>>,
  documentTypes: ["powerhouse/todo"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
    timelineEnabled: true,  // Enable timeline feature
  },
};
```

This setting enables the timeline button in the document toolbar.

### Implementation in Default Drive Explorer

When using the default drive explorer with `ph connect`, the timeline functionality is handled automatically:

1. Document analytics are collected and passed to the document toolbar
2. The timeline button appears in the toolbar when enabled
3. Users can click on timeline items to view document revisions

### Implementation in Custom Drive Explorer

For custom drive explorers, you need to handle timeline items fetching and user interaction manually:

First, import the necessary utilities from the Powerhouse common package:

```typescript
import { useTimelineItems, getRevisionFromDate } from "@powerhousedao/common";
```

1. Fetch timeline items using the `useTimelineItems` hook:
   ```typescript
   // In your EditorContainer.tsx
   const timelineItems = useTimelineItems(documentId);
   ```

2. Track the selected timeline item in state:
   ```typescript
   const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null);
   ```

3. Pass the timeline items to the DocumentToolbar and handle item selection:
   ```typescript
   <DocumentToolbar
     timelineButtonVisible={editorModule.config.timelineEnabled}
     timelineItems={timelineItems.data}
     onTimelineItemClick={setSelectedTimelineItem}
     // ... other props
   />
   ```

   Note: The `timelineButtonVisible` prop should be set based on the `timelineEnabled` setting in the editor module's configuration. This ensures the timeline button is only shown when the feature is enabled for that specific document type.

4. Pass the required context values to your editor component:
   ```typescript
   <EditorComponent
     context={{
       ...context,
       readMode: !!selectedTimelineItem,
       selectedTimelineRevision: getRevisionFromDate(
         selectedTimelineItem?.startDate,
         selectedTimelineItem?.endDate,
         document.operations.global,
       ),
     }}
     // ... other props
   />
   ```

### Handling Timeline Revisions in Document Editor

In your document editor (e.g., `editors/to-do-list/editor.tsx`), you need to handle the timeline context props:

1. Extract timeline-related properties from the context:
   ```typescript
   const { readMode = false, selectedTimelineRevision, getDocumentRevision } = context;
   ```

2. Fetch the document at the selected revision when in read mode:
   ```typescript
   const [readModeDocument, setReadModeDocument] = useState<ToDoDocument | null>(null);
   
   useEffect(() => {
     const getReadModeDocument = async () => {
       if (getDocumentRevision && readMode && typeof selectedTimelineRevision === 'number') {
         const document = await getDocumentRevision({ revisions: { global: selectedTimelineRevision } });
         setReadModeDocument(document);
       } else if (!readMode) {
         setReadModeDocument(null);
       }
     };
     getReadModeDocument();
   }, [getDocumentRevision, readMode, selectedTimelineRevision]);
   
   // Use the appropriate document based on mode
   const document = readModeDocument || writeModeDocument;
   ```

3. Adapt your UI to reflect read mode:
   ```typescript
   {readMode && (
     <div className="text-gray-500 text-md text-center">(🔒 Read Mode)</div>
   )}
   
   {!readMode && (
     // Edit controls here
   )}
   ```

This implementation allows users to navigate through document history while preventing edits to historical revisions.
