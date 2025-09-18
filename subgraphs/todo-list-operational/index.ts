import { Subgraph } from "@powerhousedao/reactor-api";
import { gql } from "graphql-tag";

export class TodoListOperationalSubgraph extends Subgraph {
  name = "todo-list-operational";

  resolvers = {
    Query: {
      todoList: {
        resolve: async () => {
          const todoList = await this.operationalStore.selectFrom("todo").selectAll().execute();
          return todoList
        },
      },
    },
  };

  typeDefs = gql`
    type Query {
      type Todo {
        name: String!
        completed: Boolean!
      }

      todoList: [Todo!]!
    }
  `;

  additionalContextFields = {
    example: "test",
  };

  async onSetup() {
    
  }

  async onDisconnect() {}
}
