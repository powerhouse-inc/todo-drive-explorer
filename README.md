# Todo Drive Explorer Example

This example demonstrates how to create a Todo Drive Explorer application using the Powerhouse platform. The application allows users to create and manage todo lists with a visual progress indicator.

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
     rm -rf editors/test-editor/hooks
     rm -rf editors/test-editor/components/FileItemsGrid.tsx
     rm -rf editors/test-editor/components/FolderItemsGrid.tsx
     rm -rf editors/test-editor/components/FolderTree.tsx
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

## Features

- Create and manage multiple todo lists
- Visual progress tracking with progress bars
- Task completion statistics
- Modern UI with responsive design
- Real-time updates

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
