import { BaseDocumentClass } from "document-model";
import {
  type AddTodoItemInput,
  type UpdateTodoItemInput,
  type DeleteTodoItemInput,
  type ToDoListState,
  type ToDoListLocalState,
} from "../types.js";
import { addTodoItem, updateTodoItem, deleteTodoItem } from "./creators.js";
import { type ToDoListAction } from "../actions.js";

export default class ToDoList_BaseOperations extends BaseDocumentClass<
  ToDoListState,
  ToDoListLocalState,
  ToDoListAction
> {
  public addTodoItem(input: AddTodoItemInput) {
    return this.dispatch(addTodoItem(input));
  }

  public updateTodoItem(input: UpdateTodoItemInput) {
    return this.dispatch(updateTodoItem(input));
  }

  public deleteTodoItem(input: DeleteTodoItemInput) {
    return this.dispatch(deleteTodoItem(input));
  }
}
