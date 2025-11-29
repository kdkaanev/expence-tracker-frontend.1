import axiosET from "../config/axiosinstance";

const budgetService = {
  getBudgets: async () => {
    try {
      const response = await axiosET.get("api/budgets");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBudget: async (budgetData) => {
    try {
      const response = await axiosET.post("api/budgets/", budgetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBudget: async (budgetId, budgetData) => {
    try {
      const response = await axiosET.put(`api/budgets/${budgetId}/`, budgetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBudget: async (budgetId) => {
    try {
      const response = await axiosET.delete(`api/budgets/${budgetId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default budgetService;
