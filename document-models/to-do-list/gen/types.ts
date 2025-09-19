import type { PHDocument, PHBaseState } from "document-model";
import type { ToDoListAction } from "./actions.js";
import type { ToDoListState as ToDoListGlobalState } from "./schema/types.js";

export { z } from "./schema/index.js";
export * from "./schema/types.js";
type ToDoListLocalState = Record<PropertyKey, never>;
type ToDoListPHState = PHBaseState & {
  global: ToDoListGlobalState;
  local: ToDoListLocalState;
};
type ToDoListDocument = PHDocument<ToDoListPHState>;

export type {
  ToDoListGlobalState,
  ToDoListLocalState,
  ToDoListPHState,
  ToDoListAction,
  ToDoListDocument,
};
