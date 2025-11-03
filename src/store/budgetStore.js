import { defineStore } from "pinia";
import budgetService from "../services/budgetService";

export const useBudgetStore = defineStore("budget", {
    state: () => ({
        budgets: [],
        loading: false,
    }),
    getters: {
        totalBudget(state) {
            return state.budgets.reduce((total, budget) => total + budget.amount, 0);
        }
    },
    actions: {
        async fetchBudgets() {
            this.loading = true;
            try {
                this.budgets = await budgetService.getBudgets();
            } catch (error) {
                console.error("Failed to fetch budgets:", error);
            } finally {
                this.loading = false;
            }
        },

        async addBudget(budgetData) {
            try {
                const newBudget = await budgetService.createBudget(budgetData);
                this.budgets.push(newBudget);
            } catch (error) {
                console.error("Failed to add budget:", error);
            }
        },

        async updateBudget(budgetId, updatedData) {
            try {
                const updatedBudget = await budgetService.updateBudget(budgetId, updatedData);
                const index = this.budgets.findIndex(b => b.id === budgetId);
                if (index !== -1) {
                    this.budgets[index] = updatedBudget;
                }
            } catch (error) {
                console.error("Failed to update budget:", error);
            }
        },

        async deleteBudget(budgetId) {
            try {
                await budgetService.deleteBudget(budgetId);
                this.budgets = this.budgets.filter(b => b.id !== budgetId);
            } catch (error) {
                console.error("Failed to delete budget:", error);
            }
        }
    },
});