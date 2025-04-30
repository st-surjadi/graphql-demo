import userService from "../services/userService.js";

const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_, { id }) => userService.getUserById(id),
  },
};

export default userResolvers;
