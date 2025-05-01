import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "./config/environment.js";
import userResolvers from "./resolvers/userResolvers.js";
import typeDefs from "./schema/_typeDefs.js";
import accountResolvers from "./resolvers/accountResolvers.js";

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
  playground: true,
});

// Start the server
const startServer = async () => {
  const PORT = process.env.PORT || 4000;
  console.log("🚀 Starting Apollo Server on port", PORT);

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });
    console.log(`✅ Server ready at ${url}`);
    console.log(`📡 API URL: ${config.API_URL}`);
  } catch (err) {
    console.error("❌ Server failed to start", err);
    process.exit(1);
  }
};

startServer();
