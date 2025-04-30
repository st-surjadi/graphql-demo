import dotenv from 'dotenv';
dotenv.config();

const config = {
  API_URL: process.env.API_URL || 'http://localhost:8081'
};

export default config;
