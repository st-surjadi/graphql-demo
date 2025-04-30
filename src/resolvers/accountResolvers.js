import accountService from "../services/accountService.js";

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
};

export default accountResolvers;
