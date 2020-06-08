import { ObjectId, Collection } from "mongodb";

export interface Player {
  _id: ObjectId;
  name: string;
  image: string;
  elo: number;
  won: number;
  lost: number;
  mainVillain: number;
}
export interface Game {
  _id: ObjectId;
  date: string;
  liberals: ObjectId[];
  villains: ObjectId[];
  liberalsWon: boolean;
}

export interface Database {
  players: Collection<Player>;
  games: Collection<Game>;
}
