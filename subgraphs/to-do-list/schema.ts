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

type ToDoItem {
  id: ID!
  text: String!
  checked: Boolean!
}

type ToDoListStats {
  total: Int!
  checked: Int!
  unchecked: Int!
} 

"""
Queries: ToDoList
"""

type ToDoListQueries {
    getDocument(driveId: String, docId: PHID): ToDoList
    getDocuments: [ToDoList!]
}

type Query {
    ToDoList: ToDoListQueries
}

"""
Mutations: ToDoList
"""
type Mutation {

    ToDoList_createDocument(driveId:String, name:String): String

    ToDoList_addTodoItem(driveId:String, docId:PHID, input:ToDoList_AddTodoItemInput): Int
    ToDoList_updateTodoItem(driveId:String, docId:PHID, input:ToDoList_UpdateTodoItemInput): Int
    ToDoList_deleteTodoItem(driveId:String, docId:PHID, input:ToDoList_DeleteTodoItemInput): Int
}

"""
Module: ToDoList
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

`