import { IResolvers } from "apollo-server-express";
import { Database, Player } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const playerResolvers: IResolvers = {
  Query: {
    players: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Player[]> => {
      return await db.players.find({}).toArray();
    },
  },
  Mutation: {
    deletePlayer: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Player | undefined> => {
      const deleteRes = await db.players.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes) throw new Error("failed to delete resource");

      return deleteRes.value;
    },
    // addPlayer: async (
    //   _root: undefined,
    //   { input }: { player: Player },
    //   { db }: { db: Database }
    // ): Promise<Player> => {
    //   const playerInsertion = await db.players.insertOne(input);

    //   if (!playerInsertion) throw new Error("failed to add resource");

    //   return input;
    // },
  },
  Player: {
    id: (player: Player): string => player._id.toString(),
  },
};
