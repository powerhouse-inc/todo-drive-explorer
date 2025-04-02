import { type BaseAction } from "document-model";
import type {
  AddTodoItemInputInput,
  UpdateTodoItemInputInput,
  DeleteTodoItemInputInput,
} from "../types.js";

export type AddTodoItemInputAction = BaseAction<
  "ADD_TODO_ITEM_INPUT",
  AddTodoItemInputInput,
  "global"
>;
export type UpdateTodoItemInputAction = BaseAction<
  "UPDATE_TODO_ITEM_INPUT",
  UpdateTodoItemInputInput,
  "global"
>;
export type DeleteTodoItemInputAction = BaseAction<
  "DELETE_TODO_ITEM_INPUT",
  DeleteTodoItemInputInput,
  "global"
>;

export type ToDoBaseOperationsAction =
  | AddTodoItemInputAction
  | UpdateTodoItemInputAction
  | DeleteTodoItemInputAction;
