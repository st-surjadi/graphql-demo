import fetch from "node-fetch";
import config from "../config/environment.js";

const accountService = {
  getAccountById: async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/accounts/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching account:", error);
      return null;
    }
  },

  getAccountsByUserId: async (userId) => {
    try {
      const response = await fetch(`${config.API_URL}/accounts/user/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }
  },

  createAccount: async (accountData) => {
    try {
      const response = await fetch(`${config.API_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      return {
        message: result.message || "Account created successfully",
        data: result.data,
      };
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },
};

export default accountService;
