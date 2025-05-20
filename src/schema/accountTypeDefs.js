export const accountTypeDefs = `
  type Account {
    id: ID!
    bank_code: String!
    account_number: String!
    account_type: String!
    balance: Float
    user: User
  }

  input CreateAccountInput {
    user_id: ID!
    bank_code: String!
    account_number: String!
    account_type: String
    balance: Float!
  }

  type AccountCreationData {
    id: ID!
    user_id: ID!
    bank_code: String!
    account_number: String!
    account_type: String!
    balance: Float!
  }

  type ApiResponseAccountCreation {
    message: String!
    data: AccountCreationData!
  }

  extend type Query {
    accountById(id: ID!): Account
    accountsByUserId(userId: ID!): [Account]
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): ApiResponseAccountCreation!
  }
`;
