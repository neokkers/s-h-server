import { resolvers, typeDefs } from "./graphql";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

const app = express();
const port = 9000;

const server = new ApolloServer({ resolvers, typeDefs });
server.applyMiddleware({ app, path: "/api" });

app.use(bodyParser.json());

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
