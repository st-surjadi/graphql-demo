import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import config from "./config/environment.js";
import userResolvers from "./resolvers/userResolvers.js";
import typeDefs from "./schema/_typeDefs.js";
import accountResolvers from "./resolvers/accountResolvers.js";
import { healthResolvers } from "./resolvers/healthResolvers.js";
import cors from "cors";
import timeout from "connect-timeout";
import path from "path";
import { fileURLToPath } from "url";
import { checkSandboxAccess } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolvers
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...accountResolvers.Query,
    ...healthResolvers.Query,
  },
  Mutation: {
    ...accountResolvers.Mutation,
  },
  Account: {
    ...accountResolvers.Account,
  },
  User: {
    ...userResolvers.User,
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
});

const app = express();

// Set request timeout to 30 seconds
app.use(timeout("30s"));

// Handle timeout errors
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "favicon.ico"));
});

// Serve Apollo Sandbox
app.get("/sandbox", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sandbox.html"));
});

const startServer = async () => {
  await server.start();

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  app.use(
    "/graphql",
    cors({
      origin: "*",
      credentials: true,
    }),
    express.json(),
    checkSandboxAccess,
    expressMiddleware(server, {
      context: async ({ req }) => {
        if (req.timedout) {
          throw new Error("Request timeout");
        }
        return {};
      },
    })
  );

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "An error occurred",
    });
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔍 Apollo Sandbox at http://localhost:${PORT}/sandbox`);
    console.log(`📡 Using API URL: ${config.API_URL}`);
  });
};

startServer();
