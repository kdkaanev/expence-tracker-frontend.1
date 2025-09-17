import { defineStore } from "pinia";
import axiosET from "../config/axiosinstance";
import { categoryIcons } from "../services/categoryIcons";

export const useTransactionStore = defineStore("transaction", {
    state: () => ({
        transactions: [],
        loading: false,
    }),
    actions: {
        async fetchTransactions() {
            this.loading = true;
            const response = await axiosET.get("api/transactions");
            this.transactions = response.data;


            this.loading = false;
        },
        async addTransaction(transactionData) {
            const response = await axiosET.post("api/transactions/", transactionData);
            this.transactions.push(response.data);
        },
        async updateTransaction(transactionId, updatedData) {
            const response = await axiosET.put(`/transactions/${transactionId}`, updatedData);
            const index = this.transactions.findIndex(tx => tx.id === transactionId);
            if (index !== -1) {
                this.transactions[index] = response.data;
            }
        },
        async deleteTransaction(transactionId) {
            await axiosET.delete(`api/transactions/${transactionId}/`);
            this.transactions = this.transactions.filter(tx => tx.id !== transactionId);
        }
    },
});