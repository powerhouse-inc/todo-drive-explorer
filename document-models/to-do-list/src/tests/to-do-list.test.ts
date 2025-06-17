import utils from '../../gen/utils.js';
import { reducer } from '../../gen/reducer.js';
import * as creators from '../../gen/creators.js';
import { ToDoListDocument } from '../../gen/types.js';

describe('Todolist Operations', () => {
    let document: ToDoListDocument;

    beforeEach(() => {
        // REMARKS: We start with a fresh, empty document for each test.
        // The `createDocument` utility initializes the state with an empty 'items' array
        // and a 'stats' object with all counts set to 0.
        document = utils.createDocument();
    });

    it('should handle addTodoItem operation', () => {
        const input = { id: '1', text: 'Buy milk' };
        
        // REMARKS: We apply the 'addTodoItem' operation.
        const updatedDocument = reducer(document, creators.addTodoItem(input));

        // REMARKS: We verify the operation was recorded in the document's history.
        // Powerhouse records every operation in an array.
        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].type).toBe('ADD_TODO_ITEM');
        // REMARKS: We also check that the input data and index are recorded correctly.
        expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);

        // REMARKS: Finally, we verify the state was updated according to our reducer logic.
        expect(updatedDocument.state.global.items).toHaveLength(1);
        expect(updatedDocument.state.global.stats.total).toBe(1);
        expect(updatedDocument.state.global.stats.unchecked).toBe(1);
    });

    it('should handle updateTodoItem operation', () => {
        // REMARKS: For an update, we first need to add an item.
        const addInput = { id: '1', text: 'Buy milk' };
        const updateInput = { id: '1', checked: true }; // We'll test checking the item.

        // REMARKS: Operations are applied sequentially to build up document state.
        const createdDocument = reducer(document, creators.addTodoItem(addInput));
        const updatedDocument = reducer(createdDocument, creators.updateTodoItem(updateInput));

        // REMARKS: Now we should have 2 operations in the history.
        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe('UPDATE_TODO_ITEM');
        expect(updatedDocument.operations.global[1].input).toStrictEqual(updateInput);
        
        // REMARKS: We check that the state reflects the update, including our stats.
        expect(updatedDocument.state.global.items[0].checked).toBe(true);
        expect(updatedDocument.state.global.stats.total).toBe(1);
        expect(updatedDocument.state.global.stats.unchecked).toBe(0);
        expect(updatedDocument.state.global.stats.checked).toBe(1);
    });

    it('should handle deleteTodoItem operation', () => {
        const addInput = { id: '1', text: 'Buy milk' };
        const deleteInput = { id: '1' };

        const createdDocument = reducer(document, creators.addTodoItem(addInput));
        const updatedDocument = reducer(createdDocument, creators.deleteTodoItem(deleteInput));

        // REMARKS: After deletion, we still have 2 operations in history,
        // but the items array is now empty and the stats are back to zero.
        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe('DELETE_TODO_ITEM');
        expect(updatedDocument.state.global.items).toHaveLength(0);
        expect(updatedDocument.state.global.stats.total).toBe(0);
        expect(updatedDocument.state.global.stats.unchecked).toBe(0);
    });
});