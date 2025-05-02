export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    gender: String
    address: String
    phone: String
    profile_picture: String
    accounts: [Account]
  }

  extend type Query {
    users(search: String): [User]
    user(id: ID!): User
  }
`;
