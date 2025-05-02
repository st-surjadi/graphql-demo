import { healthTypeDefs } from "./healthTypeDefs.js";
import { userTypeDefs } from "./userTypeDefs.js";
import { accountTypeDefs } from "./accountTypeDefs.js";

const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default [baseTypeDefs, healthTypeDefs, userTypeDefs, accountTypeDefs];
