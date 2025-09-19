// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import type { ToDoListPHState } from "./types.js";
import { z } from "./types.js";

import { reducer as BaseOperationsReducer } from "../src/reducers/base-operations.js";

export const stateReducer: StateReducer<ToDoListPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_TODO_ITEM":
      z.AddTodoItemInputSchema().parse(action.input);
      BaseOperationsReducer.addTodoItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_TODO_ITEM":
      z.UpdateTodoItemInputSchema().parse(action.input);
      BaseOperationsReducer.updateTodoItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_TODO_ITEM":
      z.DeleteTodoItemInputSchema().parse(action.input);
      BaseOperationsReducer.deleteTodoItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ToDoListPHState>(stateReducer);
