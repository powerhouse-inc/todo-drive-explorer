import { type SignalDispatch } from 'document-model';
import {
    type AddTodoItemAction,
    type UpdateTodoItemAction,
    type DeleteTodoItemAction,
} from './actions.js';
import { type ToDoListState } from '../types.js';

export interface ToDoListToDoListOperations {
    addTodoItemOperation: (state: ToDoListState, action: AddTodoItemAction, dispatch?: SignalDispatch) => void,
    updateTodoItemOperation: (state: ToDoListState, action: UpdateTodoItemAction, dispatch?: SignalDispatch) => void,
    deleteTodoItemOperation: (state: ToDoListState, action: DeleteTodoItemAction, dispatch?: SignalDispatch) => void,
}