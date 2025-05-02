import userService from "../services/userService.js";
import accountService from "../services/accountService.js";

export const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_, { id }) => userService.getUserById(id),
  },
  User: {
    accounts: async (user) => {
      return accountService.getAccountsByUserId(user.id);
    },
  },
};
export default userResolvers;
