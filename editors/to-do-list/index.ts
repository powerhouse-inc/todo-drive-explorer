import type { EditorModule, EditorProps } from "document-model";
import Editor from "./editor.js";
import type { ToDoDocument } from "../../document-models/to-do/index.js";
import { FC } from "react";

export const module: EditorModule<ToDoDocument> = {
  Component: Editor as unknown as FC<EditorProps<ToDoDocument> & Record<string, unknown>>,
  documentTypes: ["powerhouse/todo"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;