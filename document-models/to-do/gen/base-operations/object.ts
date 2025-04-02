import { BaseDocumentClass } from "document-model";
import {
  type AddTodoItemInputInput,
  type UpdateTodoItemInputInput,
  type DeleteTodoItemInputInput,
  type ToDoState,
  type ToDoLocalState,
} from "../types.js";
import {
  addTodoItemInput,
  updateTodoItemInput,
  deleteTodoItemInput,
} from "./creators.js";
import { type ToDoAction } from "../actions.js";

export default class ToDo_BaseOperations extends BaseDocumentClass<
  ToDoState,
  ToDoLocalState,
  ToDoAction
> {
  public addTodoItemInput(input: AddTodoItemInputInput) {
    return this.dispatch(addTodoItemInput(input));
  }

  public updateTodoItemInput(input: UpdateTodoItemInputInput) {
    return this.dispatch(updateTodoItemInput(input));
  }

  public deleteTodoItemInput(input: DeleteTodoItemInputInput) {
    return this.dispatch(deleteTodoItemInput(input));
  }
}
