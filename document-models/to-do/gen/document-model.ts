import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  id: "powerhouse/todo",
  name: "ToDo",
  extension: ".phdm",
  description: "todo document model",
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type ToDoState {\n  items: [ToDoItem!]!\n  stats: ToDoListStats!\n}\n\n# Defines a GraphQL type for a single to-do item\ntype ToDoItem {\n  id: ID! # Unique identifier for each to-do item\n  text: String! # The text description of the to-do item\n  checked: Boolean! # Status of the to-do item (checked/unchecked)\n}\n\n# Defines a GraphQL type for the statistics of the to-do list\ntype ToDoListStats {\n  total: Int! # Total number of items\n  checked: Int! # Number of checked items\n  unchecked: Int! # Number of unchecked items\n}",
          initialValue:
            '"{\\n  \\"items\\": [],\\n  \\"stats\\": {\\n    \\"total\\": 0,\\n    \\"checked\\": 0,\\n    \\"unchecked\\": 0\\n  }\\n}"',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: '""',
          examples: [],
        },
      },
      modules: [
        {
          id: "Z9xfHv1K7dQWt1nBeTF9E0ckd5k=",
          name: "base_operations",
          description: "",
          operations: [
            {
              id: "qLzJqfXLBcQwkmARZYVtvzslS9M=",
              name: "ADD_TODO_ITEM_INPUT",
              description: "",
              schema:
                "input AddTodoItemInputInput {\n  id: ID!\n  text: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "CbETp0f80AgUX8fHZUc2DH+YkhI=",
              name: "UPDATE_TODO_ITEM_INPUT",
              description: "",
              schema:
                "input UpdateTodoItemInputInput {\n  id: ID!\n  text: String\n  checked: Boolean\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "ll++NO6W3gr1fs9CUhAp3JlTeak=",
              name: "DELETE_TODO_ITEM_INPUT",
              description: "",
              schema: "input DeleteTodoItemInputInput {\n  id: ID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
