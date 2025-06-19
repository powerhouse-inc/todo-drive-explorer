import type { PHDocument, ExtendedState } from "document-model";
import type { ToDoListState } from "./schema/types.js";
import type { ToDoListAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type ToDoListLocalState = Record<PropertyKey, never>;
export type ExtendedToDoListState = ExtendedState<
  ToDoListState,
  ToDoListLocalState
>;
export type ToDoListDocument = PHDocument<
  ToDoListState,
  ToDoListLocalState,
  ToDoListAction
>;
export type { ToDoListState, ToDoListLocalState, ToDoListAction };
