import fetch from "node-fetch";
import config from "../config/environment.js";

const userService = {
  getAllUsers: async () => {
    try {
      const response = await fetch(`${config.API_URL}/users`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUserById: async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
};

export default userService;
