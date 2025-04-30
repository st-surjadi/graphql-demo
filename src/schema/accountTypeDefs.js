const accountTypeDefs = `#graphql
  type Account {
    id: ID!
    user_id: ID!
    bank_code: String!
    account_number: String!
    account_type: String!
    balance: Float
  }

  type AccountCreationData {
    account_id: ID!
  }

  input CreateAccountInput {
    user_id: ID!
    bank_code: String!
    account_number: String!
    account_type: String!
    balance: Int!
  }
`;

export default accountTypeDefs;
