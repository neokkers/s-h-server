import { IResolvers } from "apollo-server-express";
import { players } from "./../mock/players";

export const resolvers: IResolvers = {
  Query: {
    players: () => players,
  },
  Mutation: {
    deletePlayer: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) return players.splice(i, 1)[0];
      }

      throw new Error(`failed to delete player ${id}`);
    },
  },
};
