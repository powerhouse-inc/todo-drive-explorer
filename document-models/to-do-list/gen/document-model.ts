import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/todolist",
  name: "ToDoList",
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
            "type ToDoListState {\n  items: [ToDoItem!]!\n  stats: ToDoListStats!\n}\n\n# Defines a GraphQL type for a single to-do item\ntype ToDoItem {\n  id: ID! # Unique identifier for each to-do item\n  text: String! # The text description of the to-do item\n  checked: Boolean! # Status of the to-do item (checked/unchecked)\n}\n\n# Defines a GraphQL type for the statistics of the to-do list\ntype ToDoListStats {\n  total: Int! # Total number of items\n  checked: Int! # Number of checked items\n  unchecked: Int! # Number of unchecked items\n}",
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
          id: "87bf6b13-9de5-4d37-9b0d-a2c34e876280",
          name: "base_operations",
          description: "",
          operations: [
            {
              id: "d75156cf-e281-4f15-8375-86d1040e7a21",
              name: "ADD_TODO_ITEM",
              description: "",
              schema: "input AddTodoItemInput {\n  id: ID!\n  text: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "c80817d1-d141-406d-8c96-ab2513810375",
              name: "UPDATE_TODO_ITEM",
              description: "",
              schema:
                "input UpdateTodoItemInput {\n  id: ID!\n  text: String\n  checked: Boolean\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "d1fcdf77-c41c-41ab-90ad-198c2b5c1248",
              name: "DELETE_TODO_ITEM",
              description: "",
              schema: "input DeleteTodoItemInput {\n  id: ID!\n}",
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
