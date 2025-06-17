import { EditorProps } from 'document-model'; // Core type for editor components.
import {
    ToDoListState,       // Type for the global state of the ToDoList.
    ToDoListAction,      // Type for actions that can modify the ToDoList state.
    ToDoListLocalState,  // Type for local (non-shared) editor state (if needed).
    ToDoItem,            // Type for a single item in the list.
    actions,             // Object containing action creators for dispatching changes.
    ToDoListDocument     // The complete document structure including state and metadata.
} from '../../document-models/to-do-list/index.js'; // Path to your document model definition.
import { useState } from 'react'; // React hook for managing component-local state.
import { Checkbox } from './components/checkbox.js'; // Custom Checkbox component.
import { InputField } from './components/inputField.js'; // Custom InputField component.

// Define the props expected by this Editor component. It extends EditorProps with our specific document type.
export type IProps = EditorProps<ToDoListDocument>;

// Define the main Editor component function.
export default function Editor(props: IProps) {
    // Destructure props for easier access.
    const { document, dispatch } = props;
    // Access the global state from the document object.
    const { state: { global: state } } = document;

    // --- Component State ---
    // State for the text input field where new tasks are typed.
    const [todoItem, setTodoItem] = useState('');
    // State to track which item is currently being edited (null if none). Stores the item's ID.
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    // State to hold the text of the item currently being edited.
    const [editedText, setEditedText] = useState('');

    // Sort items to show unchecked items first
    const sortedItems: ToDoItem[] = [...state.items].sort((a, b) => {
        return (a.checked ? 1 : 0) - (b.checked ? 1 : 0);
    });

    // --- JSX Structure (What gets rendered) ---
    return (
        // Main container div.
        // `container`: Sets max-width based on viewport breakpoints.
        // `mx-auto`: Centers the container horizontally.
        // `p-4`: Adds padding on all sides (4 units, typically 1rem).
        // `max-w-sm`: Sets a maximum width (small size).
        <div className="container mx-auto p-4 max-w-xs">
            {/* Heading for the editor */}
            {/* `text-2xl`: Sets font size to extra-large. */}
            {/* `font-bold`: Makes the text bold. */}
            {/* `mb-4`: Adds margin to the bottom. */}
            <h1 className="text-2xl font-bold mb-4">To-do List</h1>

            {/* Stats Section */}
            {state.items.length >= 2 && (
                <div className="mb-4 bg-white rounded-lg px-3 py-2 shadow-md">
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <div className="text-xs text-slate-500 mb-0.5">Total</div>
                            <div className="text-lg font-semibold text-slate-800">{state.stats.total}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-0.5">Completed</div>
                            <div className="text-lg font-semibold text-green-600">{state.stats.checked}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-0.5">Remaining</div>
                            <div className="text-lg font-semibold text-orange-600">{state.stats.unchecked}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Container for the input field and "Add" button */}
            {/* `flex items-end`: Enables flexbox layout for children with bottom alignment. */}
            {/* `gap-2`: Adds a small gap between flex items. */}
            {/* `mb-4`: Adds margin to the bottom. */}
            <div className="flex items-end gap-2 mb-4">
                {/* Custom InputField component */}
                <div className="flex-grow">
                    <InputField
                        label="New Task" // Prop for accessibility/placeholder.
                        input={todoItem} // Current value from state.
                        value={todoItem} // Controlled component value.
                        handleInputChange={(e) => setTodoItem(e.target.value)} // Update state on change.
                        onKeyDown={(e) => { // Handle "Enter" key press to add item.
                            if (e.key === 'Enter' && todoItem.trim()) { // Check if key is Enter and input is not empty
                                dispatch(actions.addTodoItem({ // Dispatch action to add item.
                                    id: Math.random().toString(), // Generate a simple unique ID (use a better method in production!).
                                    text: todoItem,
                                }));
                                setTodoItem(''); // Clear the input field.
                            }
                        }}
                    />
                </div>
                {/* "Add" button */}
                {/* `bg-blue-500`: Sets background color to blue. */}
                {/* `hover:bg-blue-600`: Changes background color on hover. */}
                {/* `text-white`: Sets text color to white. */}
                {/* `px-4`: Adds horizontal padding (4 units). */}
                {/* `py-1.5`: Adds vertical padding (1.5 units). */}
                {/* `rounded`: Applies rounded corners. */}
                {/* `transition-colors`: Smoothly animates color changes. */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded transition-colors"
                    onClick={() => { // Handle button click to add item.
                        if (todoItem.trim()) { // Check if input is not empty
                            dispatch(actions.addTodoItem({ // Dispatch action to add item.
                                id: Math.random().toString(), // Simple unique ID.
                                text: todoItem,
                            }));
                            setTodoItem(''); // Clear the input field.
                        }
                    }}
                >
                    Add
                </button>
            </div>

            {/* Unordered list to display the to-do items */}
            {/* `list-none`: Removes default list bullet points. */}
            {/* `p-0`: Removes default padding. */}
            <ul className="list-none p-0">
                {/* Map over the items array in the global state to render each item */}
                {sortedItems.map((item: ToDoItem) => (
                    // List item element for each to-do.
                    // `key={item.id}`: React requires a unique key for list items for efficient updates.
                    // `flex`: Enables flexbox layout (checkbox, text, delete icon in a row).
                    // `items-center`: Aligns items vertically in the center.
                    // `p-2`: Adds padding.
                    // `relative`: Needed for positioning the delete icon absolutely (if we were doing that).
                    // `border-b`: Adds a bottom border.
                    // `border-gray-100`: Sets border color to light gray.
                    <li
                        key={item.id}
                        className="flex items-center p-2 relative border-b border-gray-100"
                    >
                        {/* Custom Checkbox component */}
                        <Checkbox
                            value={item.checked} // Bind checked state to item's checked property.
                            onChange={() => { // Handle checkbox click.
                                dispatch(actions.updateTodoItem({ // Dispatch action to update item.
                                    id: item.id,
                                    checked: !item.checked, // Toggle the checked state.
                                }));
                            }}
                        />

                        {/* Conditional Rendering: Show input field or text based on editing state */}
                        {editingItemId === item.id ? (
                            // --- Editing State ---
                            // Input field shown when this item is being edited.
                            // `ml-2`: Adds left margin.
                            // `flex-grow`: Allows input to take available horizontal space.
                            // `p-1`: Adds small padding.
                            // `border`: Adds a default border.
                            // `rounded`: Applies rounded corners.
                            // `focus:outline-none`: Removes the default browser focus outline.
                            // `focus:ring-1 focus:ring-blue-500`: Adds a custom blue ring when focused.
                            <input
                                className="ml-2 flex-grow p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={editedText} // Controlled input value from editedText state.
                                onChange={(e) => setEditedText(e.target.value)} // Update editedText state.
                                onKeyDown={(e) => { // Handle "Enter" key to save changes.
                                    if (e.key === 'Enter') {
                                        dispatch(actions.updateTodoItem({ // Dispatch update action.
                                            id: item.id,
                                            text: editedText, // Save the edited text.
                                        }));
                                        setEditingItemId(null); // Exit editing mode.
                                    }
                                }}
                                autoFocus // Automatically focus the input when it appears.
                            />
                        ) : (
                            // --- Display State ---
                            // Container for the item text and delete icon when not editing.
                            // `ml-2`: Adds left margin.
                            // `flex items-center`: Aligns text and icon vertically.
                            // `flex-grow`: Allows this container to take available space.
                            // `gap-1`: Adds a small gap between text and icon.
                            <div className="ml-2 flex items-center flex-grow gap-1">
                                {/* The actual to-do item text */}
                                {/* `cursor-pointer`: Shows a pointer cursor on hover, indicating clickability. */}
                                {/* Conditional class: Apply line-through and gray text if item is checked. */}
                                {/* `line-through`: Strikes through the text. */}
                                {/* `text-gray-500`: Sets text color to gray. */}
                                <span
                                    className={`cursor-pointer ${item.checked ? 'line-through text-gray-500' : ''}`}
                                    onClick={() => { // Handle click to enter editing mode.
                                        setEditingItemId(item.id); // Set the ID of the item being edited.
                                        setEditedText(item.text); // Initialize the input with current text.
                                    }}
                                >
                                    {item.text} {/* Display the item's text */}
                                </span>
                                {/* Delete "button" (using a span styled as a button) */}
                                {/* `text-gray-400`: Sets default text color to light gray. */}
                                {/* `cursor-pointer`: Shows pointer cursor. */}
                                {/* `opacity-40`: Makes it semi-transparent by default. */}
                                {/* `transition-all duration-200`: Smoothly animates all changes (opacity, color). */}
                                {/* `text-base font-bold`: Sets text size and weight. */}
                                {/* `inline-flex items-center`: Needed for proper alignment if using an icon font/SVG. */}
                                {/* `pl-1`: Adds small left padding. */}
                                {/* `hover:opacity-100`: Makes it fully opaque on hover. */}
                                {/* `hover:text-red-500`: Changes text color to red on hover. */}
                                <span
                                    className="text-gray-400 cursor-pointer opacity-40 transition-all duration-200 text-base font-bold inline-flex items-center pl-1 hover:opacity-100 hover:text-red-500"
                                    onClick={() => dispatch(actions.deleteTodoItem({ id: item.id }))} // Dispatch delete action on click.
                                >
                                    × {/* Simple multiplication sign used as delete icon */}
                                </span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}