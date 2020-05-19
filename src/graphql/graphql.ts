import { players } from "./../mock/players";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";

const Player = new GraphQLObjectType({
  name: "Player",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    elo: { type: GraphQLNonNull(GraphQLInt) },
    won: { type: GraphQLNonNull(GraphQLInt) },
    lost: { type: GraphQLNonNull(GraphQLInt) },
    mainVillain: { type: GraphQLNonNull(GraphQLInt) },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    players: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Player))),
      resolve: () => players,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deletePlayer: {
      type: GraphQLNonNull(Player),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_root, { id }) => {
        for (let i = 0; i < players.length; i++) {
          if (players[i].id === id) return players.splice(i, 1)[0];
        }

        throw new Error(`failed to delete player ${id}`);
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
