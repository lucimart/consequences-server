import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import typeDefs from "./schema";
import resolvers from "./resolvers/index";
import { getUserId } from "./utils";
require("dotenv").config();

const runServer = () => {
  const port = process.env.PORT || 4000;

  const app = express();
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
  });

  app.use(cors());

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port }, () =>
    console.log(
      `🚀 Server is running on http://localhost:${port}${server.graphqlPath}`
    )
  );
};

runServer();
