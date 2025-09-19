import type { PHDocument } from "document-model";
import type { ToDoListDocument } from "./document-models/to-do-list/index.js";

export function isTodoDocument(
  document: PHDocument | undefined,
): document is ToDoListDocument {
  return document?.header.documentType === "powerhouse/todolist";
}
