import type { PHDocument, ExtendedState } from "document-model";
import type { ToDoState } from "./schema/types.js";
import type { ToDoAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type ToDoLocalState = Record<PropertyKey, never>;
export type ExtendedToDoState = ExtendedState<ToDoState, ToDoLocalState>;
export type ToDoDocument = PHDocument<ToDoState, ToDoLocalState, ToDoAction>;
export type { ToDoState, ToDoLocalState, ToDoAction };
