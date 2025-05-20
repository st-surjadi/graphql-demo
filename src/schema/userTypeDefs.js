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

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
    gender: String
    address: String
    phone: String
    profile_picture: String
  }

  type UserCreationData {
    user_id: ID!
  }

  type ApiResponseUserCreation {
    message: String!
    data: UserCreationData!
  }

  extend type Query {
    users(search: String): [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(user: CreateUserInput!): ApiResponseUserCreation!
  }
`;
