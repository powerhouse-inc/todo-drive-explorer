import type { EditorModule } from "document-model";
import Editor from "./editor.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["powerhouse/todolist"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
    timelineEnabled: true,
  },
};

export default module;
