import accountService from "../services/accountService.js";
import userService from "../services/userService.js";

const accountResolvers = {
  Query: {
    accountById: async (_, { id }) => {
      return accountService.getAccountById(id);
    },
    accountsByUserId: async (_, { userId }) => {
      return accountService.getAccountsByUserId(userId);
    },
  },

  Mutation: {
    createAccount: async (_, { input }) => {
      return accountService.createAccount(input);
    },
  },

  Account: {
    user: async (account) => {
      if (account.user) {
        return account.user;
      }
      return userService.getUserById(account.user_id);
    },
  },
};

export default accountResolvers;
