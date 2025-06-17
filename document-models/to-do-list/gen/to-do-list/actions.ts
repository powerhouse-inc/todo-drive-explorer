import { type BaseAction } from 'document-model';
import type {
    AddTodoItemInput,
    UpdateTodoItemInput,
    DeleteTodoItemInput,
} from '../types.js';

export type AddTodoItemAction = BaseAction<'ADD_TODO_ITEM', AddTodoItemInput, 'global'>;
export type UpdateTodoItemAction = BaseAction<'UPDATE_TODO_ITEM', UpdateTodoItemInput, 'global'>;
export type DeleteTodoItemAction = BaseAction<'DELETE_TODO_ITEM', DeleteTodoItemInput, 'global'>;

export type ToDoListToDoListAction = 
    | AddTodoItemAction
    | UpdateTodoItemAction
    | DeleteTodoItemAction
;