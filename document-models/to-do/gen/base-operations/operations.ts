import { type SignalDispatch } from "document-model";
import {
  type AddTodoItemInputAction,
  type UpdateTodoItemInputAction,
  type DeleteTodoItemInputAction,
} from "./actions.js";
import { type ToDoState } from "../types.js";

export interface ToDoBaseOperationsOperations {
  addTodoItemInputOperation: (
    state: ToDoState,
    action: AddTodoItemInputAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTodoItemInputOperation: (
    state: ToDoState,
    action: UpdateTodoItemInputAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTodoItemInputOperation: (
    state: ToDoState,
    action: DeleteTodoItemInputAction,
    dispatch?: SignalDispatch,
  ) => void;
}
