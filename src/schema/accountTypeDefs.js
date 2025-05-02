export const accountTypeDefs = `
  type Account {
    id: ID!
    bank_code: Int!
    account_number: String!
    account_type: String!
    balance: Float # Optional
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
