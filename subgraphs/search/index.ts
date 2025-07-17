import { Subgraph } from "@powerhousedao/reactor-api";

import { gql } from "graphql-tag";
import { TodoIndexerProcessor } from "../../processors/todo-indexer/index.js";

export class SearchSubgraph extends Subgraph {
  name = "search";

  resolvers = {
    Query: {
      todos: {
        resolve: async (_: any, args: {driveId: string}) => {
          const todos = await TodoIndexerProcessor.query(args.driveId, this.relationalDb).selectFrom("todo").selectAll().execute();
          return todos.map((todo) => ({
            task: todo.task,
            status: todo.status,
          }));
        },
      },
    },
  };

  typeDefs = gql`

  type ToDoListEntry {
    task: String!
    status: Boolean!
  }

    type Query {
      todos(driveId: ID!): [ToDoListEntry]
    }
  `;

  additionalContextFields = {
    example: "test",
  };


  async onDisconnect() {}
}
