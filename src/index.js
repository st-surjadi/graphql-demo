import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import config from "./config/environment.js";
import userResolvers from "./resolvers/userResolvers.js";
import typeDefs from "./schema/_typeDefs.js";
import accountResolvers from "./resolvers/accountResolvers.js";
import cors from "cors";

// Resolvers
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...accountResolvers.Query,
  },
  Mutation: {
    ...accountResolvers.Mutation,
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
});

const app = express();

app.use(express.json());

const startServer = async () => {
  await server.start();

  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.use(
    "/graphql",
    cors({
      origin: "*",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📡 Using API URL: ${config.API_URL}`);
  });
};

startServer(); // Start the server asynchronously
