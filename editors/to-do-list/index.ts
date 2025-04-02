import type { EditorModule } from "document-model";
import Editor from "./editor.js";
import type { ToDoDocument } from "../../document-models/to-do/index.js";

export const module: EditorModule<ToDoDocument> = {
  Component: Editor,
  documentTypes: ["powerhouse/todo"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
