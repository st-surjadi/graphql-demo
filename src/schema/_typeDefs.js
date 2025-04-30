import userTypeDefs from "./userTypeDefs.js";
import accountTypeDefs from "./accountTypeDefs.js";

const typeDefs = `#graphql
  ${userTypeDefs}
  ${accountTypeDefs}

  union ResponseData = AccountCreationData

  type ApiResponse {
    message: String!
    data: AccountCreationData!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    accountById(id: ID!): Account
    accountsByUserId(userId: ID!): [Account]
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): ApiResponse
  }
`;

export default typeDefs;
