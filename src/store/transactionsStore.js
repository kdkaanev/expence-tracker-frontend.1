import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axiosET from "../config/axiosinstance";
import { categoryIcons } from "../services/categoryIcons";
import { eachDayOfInterval, endOfMonth, startOfMonth, format } from "date-fns";

export const useTransactionStore = defineStore("transaction", {
    state: () => ({
        transactions: [],
        loading: false,
    }),
    getters: {
        positiveTransactions(state) {
            return state.transactions.filter(t => t.type === 'income');
        },
        negativeTransactions(state) {
            return state.transactions.filter(t => t.type === 'expense');
        }, 
        daysOfMonth: () => {
            const start = startOfMonth(new Date());
            const end = endOfMonth(new Date());
            return eachDayOfInterval({ start, end }).map(date => format(date, 'yyyy-MM-dd'));
        },
        dailyExpenses(state) {
            const gruped = Object.fromEntries(Array.from(eachDayOfInterval({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) })).map(date => [format(date, 'yyyy-MM-dd'), 0]));
            state.transactions.forEach(tx => {
                if (tx.type === 'expense' && gruped[tx.transaction_date ] !== undefined) {
                    gruped[tx.transaction_date ] += parseFloat(tx.amount);
                }       
        })
            return Object.values(gruped);
        },

        dailyExpensesByCategory: (state) => {
            (categoryName) => {
                const gruped = Object.fromEntries(Array.from(eachDayOfInterval({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) })).map(date => [format(date, 'yyyy-MM-dd'), 0]));
                state.transactions.forEach(tx => {
                    if (tx.type === 'expense' && tx.category === categoryName && gruped[tx.transacton_date ] !== undefined) {
                        gruped[tx.transacton_date ] += parseFloat(tx.amount);
                    }       
                })
                return Object.values(gruped);
            }
        }
    },

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
            const response = await axiosET.put(`api/transactions/${transactionId}/`, updatedData);
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