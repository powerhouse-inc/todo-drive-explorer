import { Subgraph } from "@powerhousedao/reactor-api";

import { gql } from "graphql-tag";

export class SearchSubgraph extends Subgraph {
  name = "search";

  resolvers = {
    Query: {
      example: {
        resolve: async () => {
          return "example";
        },
      },
    },
  };

  typeDefs = gql`
    type Query {
      example(id: ID!): String
    }
  `;

  additionalContextFields = {
    example: "test",
  };

  async onSetup() {
    
  }

  async onDisconnect() {}
}
