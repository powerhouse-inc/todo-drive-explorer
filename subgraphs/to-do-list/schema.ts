import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for ToDoList (powerhouse/todolist)
  """
  type ToDoListState {
    items: [ToDoItem!]!
    stats: ToDoListStats!
  }

  # Defines a GraphQL type for a single to-do item
  type ToDoItem {
    id: ID! # Unique identifier for each to-do item
    text: String! # The text description of the to-do item
    checked: Boolean! # Status of the to-do item (checked/unchecked)
  }

  # Defines a GraphQL type for the statistics of the to-do list
  type ToDoListStats {
    total: Int! # Total number of items
    checked: Int! # Number of checked items
    unchecked: Int! # Number of unchecked items
  }

  """
  Queries: ToDoList
  """
  type ToDoListQueries {
    getDocument(driveId: String, docId: PHID): ToDoList
    getDocuments(driveId: String): [ToDoList!]
  }

  type Query {
    ToDoList: ToDoListQueries
  }

  """
  Mutations: ToDoList
  """
  type Mutation {
    ToDoList_createDocument(driveId: String, name: String): String

    ToDoList_addTodoItem(
      driveId: String
      docId: PHID
      input: ToDoList_AddTodoItemInput
    ): Int
    ToDoList_updateTodoItem(
      driveId: String
      docId: PHID
      input: ToDoList_UpdateTodoItemInput
    ): Int
    ToDoList_deleteTodoItem(
      driveId: String
      docId: PHID
      input: ToDoList_DeleteTodoItemInput
    ): Int
  }

  """
  Module: BaseOperations
  """
  input ToDoList_AddTodoItemInput {
    id: ID!
    text: String!
  }
  input ToDoList_UpdateTodoItemInput {
    id: ID!
    text: String
    checked: Boolean
  }
  input ToDoList_DeleteTodoItemInput {
    id: ID!
  }
`;
