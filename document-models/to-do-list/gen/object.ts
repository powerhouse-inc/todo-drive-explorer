import { BaseDocumentClass, type ExtendedState, type PartialState, applyMixins, type SignalDispatch } from 'document-model';
import { type ToDoListState, type ToDoListLocalState } from './types.js';
import { type ToDoListAction } from './actions.js';
import { reducer } from './reducer.js';
import utils from './utils.js';
import ToDoList_ToDoList from './to-do-list/object.js';

export * from './to-do-list/object.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface ToDoList extends 
    ToDoList_ToDoList {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class ToDoList extends BaseDocumentClass<ToDoListState, ToDoListLocalState, ToDoListAction> {
    static fileExtension = '';

    constructor(initialState?: Partial<ExtendedState<PartialState<ToDoListState>, PartialState<ToDoListLocalState>>>, dispatch?: SignalDispatch) {
        super(reducer, utils.createDocument(initialState), dispatch);
    }

    public saveToFile(path: string, name?: string) {
        return super.saveToFile(path, ToDoList.fileExtension, name);
    }

    public loadFromFile(path: string) {
        return super.loadFromFile(path);
    }

    static async fromFile(path: string) {
        const document = new this();
        await document.loadFromFile(path);
        return document;
    }
}

applyMixins(ToDoList, [
    ToDoList_ToDoList
]);

export { ToDoList };