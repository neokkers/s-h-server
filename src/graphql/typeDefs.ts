import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    image: String!
    elo: Int!
    won: Int!
    lost: Int!
    mainVillain: Int!
  }

  type Query {
    players: [Player!]!
  }

  type Mutation {
    deletePlayer(id: ID!): Player!
  }
`;
