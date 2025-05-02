import dotenv from "dotenv";
dotenv.config();

const config = {
  API_URL: process.env.API_URL || "http://localhost:4000",
  SANDBOX_SECRET_KEY: process.env.SANDBOX_SECRET_KEY || "demo123",
};

export default config;
