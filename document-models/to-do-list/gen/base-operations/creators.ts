import { createAction } from "document-model";
import {
  z,
  type AddTodoItemInput,
  type UpdateTodoItemInput,
  type DeleteTodoItemInput,
} from "../types.js";
import {
  type AddTodoItemAction,
  type UpdateTodoItemAction,
  type DeleteTodoItemAction,
} from "./actions.js";

export const addTodoItem = (input: AddTodoItemInput) =>
  createAction<AddTodoItemAction>(
    "ADD_TODO_ITEM",
    { ...input },
    undefined,
    z.AddTodoItemInputSchema,
    "global",
  );

export const updateTodoItem = (input: UpdateTodoItemInput) =>
  createAction<UpdateTodoItemAction>(
    "UPDATE_TODO_ITEM",
    { ...input },
    undefined,
    z.UpdateTodoItemInputSchema,
    "global",
  );

export const deleteTodoItem = (input: DeleteTodoItemInput) =>
  createAction<DeleteTodoItemAction>(
    "DELETE_TODO_ITEM",
    { ...input },
    undefined,
    z.DeleteTodoItemInputSchema,
    "global",
  );
