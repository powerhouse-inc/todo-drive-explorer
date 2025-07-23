import { type HookState } from "@powerhousedao/reactor-browser/hooks/document-state";
import { type ToDoListDocument } from "../../../document-models/to-do-list/index.js";

export type ToDoState = HookState & ToDoListDocument["state"];
