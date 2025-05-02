export const healthTypeDefs = `
  type HealthStatus {
    status: String!
    timestamp: String!
    uptime: Float!
    version: String!
    environment: String!
  }

  extend type Query {
    health: HealthStatus!
  }
`;
