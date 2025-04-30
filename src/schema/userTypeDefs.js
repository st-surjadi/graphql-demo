const userTypeDefs = `#graphql
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
`;

export default userTypeDefs;