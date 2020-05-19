require("dotenv").config();
import { connectDB } from "./../db";
import { ObjectId } from "mongodb";
import { Player, Database } from "./../lib/types";

const players: Player[] = [
  {
    _id: new ObjectId(),
    name: "Vasya",
    image: "url",
    elo: 800,
    won: 0,
    lost: 0,
    mainVillain: 0,
  },
  {
    _id: new ObjectId(),
    name: "Vasya 2",
    image: "url",
    elo: 800,
    won: 0,
    lost: 0,
    mainVillain: 0,
  },
  {
    _id: new ObjectId(),
    name: "Vasya 3",
    image: "url",
    elo: 800,
    won: 0,
    lost: 0,
    mainVillain: 0,
  },
];

const seedPlayers = async (db: Database) => {
  try {
    console.log("[seed] : running...");

    for (const player of players) {
      await db.players.insertOne(player);
    }
    console.log("[seed] : success");
  } catch (error) {
    throw new Error("failed to seed db");
  }
};
const removePlayers = async (db: Database) => {
  try {
    console.log("[remove] : running...");

    await db.players.deleteMany({});
    console.log("[remove] : success");
  } catch (error) {
    throw new Error("failed to seed db");
  }
};

connectDB().then((db) => {
  if (process.argv[2] === "-sp") {
    seedPlayers(db);
  }
  if (process.argv[2] === "-dp") {
    removePlayers(db);
  }
});
