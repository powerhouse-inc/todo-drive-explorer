export const typeDefs = `
  type Query {
    todoList: TodoListSummary
    todoItems(checked: Boolean): [TodoItem!]!
    todoItemsCount(checked: Boolean): Int!
  }

  type TodoListSummary {
    total: Int!     # Total number of items
    checked: Int!   # Number of completed items  
    unchecked: Int! # Number of pending items
  }
  type TodoItem {
    id: ID!          # Unique identifier
    text: String!    # The task description
    checked: Boolean! # Completion status
  }
}`
