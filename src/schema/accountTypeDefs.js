export const accountTypeDefs = `
  enum BankCode {
    BCA
    MANDIRI
  }

  type Account {
    id: ID!
    bank_code: BankCode!
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
    bank_code: BankCode!
    account_number: String!
    account_type: String!
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
