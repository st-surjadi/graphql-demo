import fetch from "node-fetch";
import config from "../config/environment.js";

const BANK_CODES = {
  BCA: "1234",
  MANDIRI: "1235",
};

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

  createAccount: async (input) => {
    try {
      const payload = {
        ...input,
        bank_code: BANK_CODES[input.bank_code],
      };

      const response = await fetch(`${config.API_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid response structure");
      }

      return data;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },
};

export default accountService;
