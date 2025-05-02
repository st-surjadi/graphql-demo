export const accountTypeDefs = `
  type Account {
    id: ID!
    userId: ID!
    type: String!
    balance: Float!
    user: User
  }

  input CreateAccountInput {
    userId: ID!
    type: String!
    initialBalance: Float!
  }

  type AccountCreationData {
    id: ID!
    userId: ID!
    type: String!
    balance: Float!
  }

  union ResponseData = AccountCreationData

  type ApiResponse {
    message: String!
    data: AccountCreationData!
  }

  extend type Query {
    accountById(id: ID!): Account
    accountsByUserId(userId: ID!): [Account]
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): ApiResponse
  }
`;
