import { createAction } from "document-model";
import {
  z,
  type AddTodoItemInputInput,
  type UpdateTodoItemInputInput,
  type DeleteTodoItemInputInput,
} from "../types.js";
import {
  type AddTodoItemInputAction,
  type UpdateTodoItemInputAction,
  type DeleteTodoItemInputAction,
} from "./actions.js";

export const addTodoItemInput = (input: AddTodoItemInputInput) =>
  createAction<AddTodoItemInputAction>(
    "ADD_TODO_ITEM_INPUT",
    { ...input },
    undefined,
    z.AddTodoItemInputInputSchema,
    "global",
  );

export const updateTodoItemInput = (input: UpdateTodoItemInputInput) =>
  createAction<UpdateTodoItemInputAction>(
    "UPDATE_TODO_ITEM_INPUT",
    { ...input },
    undefined,
    z.UpdateTodoItemInputInputSchema,
    "global",
  );

export const deleteTodoItemInput = (input: DeleteTodoItemInputInput) =>
  createAction<DeleteTodoItemInputAction>(
    "DELETE_TODO_ITEM_INPUT",
    { ...input },
    undefined,
    z.DeleteTodoItemInputInputSchema,
    "global",
  );
