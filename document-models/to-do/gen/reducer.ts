import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type ToDoDocument, z } from "./types.js";

import { reducer as BaseOperationsReducer } from "../src/reducers/base-operations.js";

const stateReducer: StateReducer<ToDoDocument> = (state, action, dispatch) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_TODO_ITEM_INPUT":
      z.AddTodoItemInputInputSchema().parse(action.input);
      BaseOperationsReducer.addTodoItemInputOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "UPDATE_TODO_ITEM_INPUT":
      z.UpdateTodoItemInputInputSchema().parse(action.input);
      BaseOperationsReducer.updateTodoItemInputOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "DELETE_TODO_ITEM_INPUT":
      z.DeleteTodoItemInputInputSchema().parse(action.input);
      BaseOperationsReducer.deleteTodoItemInputOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ToDoDocument>(stateReducer);
