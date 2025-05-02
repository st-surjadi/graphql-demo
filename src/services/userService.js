import fetch from "node-fetch";
import config from "../config/environment.js";

const userService = {
  getAllUsers: async (params) => {
    try {
      const url = new URL(`${config.API_URL}/users`);

      // Add each parameter to the URL
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, value);
          }
        });
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid response structure");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid response structure");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};

export default userService;
