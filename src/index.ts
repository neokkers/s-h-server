require("dotenv").config();

import { connectDB } from "./db/index";
import { resolvers, typeDefs } from "./graphql";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
const yellowBold = require("colors").yellow.bold;

const mount = async (app: Application) => {
  const db = await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(yellowBold(`[app]: http://localhost:${process.env.PORT}`));
  console.log(
    yellowBold(`[app/api]: http://localhost:${process.env.PORT}/api`)
  );
};

mount(express());
