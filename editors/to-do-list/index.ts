import type { EditorModule, EditorProps } from "document-model";
import Editor from "./editor.js";
import type { ToDoListDocument } from "../../document-models/to-do-list/index.js";
import { type FC } from "react";

export const module: EditorModule<ToDoListDocument> = {
  Component: Editor as unknown as FC<EditorProps<ToDoListDocument> & Record<string, unknown>>,
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