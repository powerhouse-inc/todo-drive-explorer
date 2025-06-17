import { ToDoListToDoListOperations } from '../../gen/to-do-list/operations.js';
import { ToDoListState } from '../../gen/types.js'; // Assuming this now includes the 'stats' object

// REMARKS: This is our main reducer object. It implements all operations defined in the schema.
// The ToDoListToDoListOperations type is auto-generated from our GraphQL specification and ensures type safety.
export const reducer: ToDoListToDoListOperations = {
    // REMARKS: The addTodoItemOperation adds a new item and updates our tracking statistics.
    // - state: The current document state. Powerhouse uses a library like Immer.js,
    //   so you can write code that looks like it's mutating the state directly.
    //   Behind the scenes, Powerhouse ensures this results in an immutable update.
    // - action: Contains the operation's 'type' and 'input' data from the client.
    // - dispatch: A function to trigger subsequent operations (advanced, not used here).
    addTodoItemOperation(state, action, dispatch) {
        // REMARKS: We update our statistics for total and unchecked items.
        state.stats.total += 1;
        state.stats.unchecked += 1;

        // REMARKS: We push the new to-do item into the items array.
        // The data for the new item comes from the operation's input.
        state.items.push({
            id: action.input.id,
            text: action.input.text,
            checked: false, // New items always start as unchecked.
        });
    },

    // REMARKS: The updateTodoItemOperation modifies an existing to-do item.
    // It handles partial updates for text and checked status.
    updateTodoItemOperation(state, action, dispatch) {
        // REMARKS: First, we find the specific item we want to update using its ID.
        const item = state.items.find(item => item.id === action.input.id);
        
        // REMARKS: It's good practice to handle cases where the item might not be found.
        if (!item) {
            throw new Error(`Item with id ${action.input.id} not found`);
        }
        
        // REMARKS: We only update the text if it was provided in the input.
        // This allows for partial updates (e.g., just checking an item without changing its text).
        if (action.input.text) {
            item.text = action.input.text;
        }

        // REMARKS: When the checked status changes, we also update our statistics.
        // We check if the `checked` property is provided and if it's different from the current one.
        if (typeof action.input.checked === 'boolean' && item.checked !== action.input.checked) {
            if (action.input.checked) {
                // it was unchecked, now it is checked
                state.stats.unchecked -= 1;
                state.stats.checked += 1;
            } else {
                // it was checked, now it is unchecked
                state.stats.unchecked += 1;
                state.stats.checked -= 1;
            }
            item.checked = action.input.checked;
        }
    },

    // REMARKS: The deleteTodoItemOperation removes an item from the list.
    deleteTodoItemOperation(state, action, dispatch) {
        // REMARKS: Before removing the item, we find it to determine its checked status.
        // This is necessary to correctly decrement our statistics.
        const item = state.items.find(item => item.id === action.input.id);

        if (item) {
            // REMARKS: We always decrement the total count.
            state.stats.total -= 1;

            // REMARKS: We then decrement the 'checked' or 'unchecked' count based on the item's status.
            if (item.checked) {
                state.stats.checked -= 1;
            } else {
                state.stats.unchecked -= 1;
            }
        }

        // REMARKS: Finally, we create a new 'items' array that excludes the deleted item.
        // Assigning to 'state.items' is handled by Powerhouse to produce a new immutable state.
        state.items = state.items.filter(item => item.id !== action.input.id);
    },
};