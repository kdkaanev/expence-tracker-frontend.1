import { defineStore } from "pinia";
import potsSesrvice from "../services/potsService";

export const usePotsStore = defineStore("pots", {
    state: () => ({
        pots: [],
        loading: false,
    }),
    actions: {
        async fetchPots() {
            this.loading = true;
            try {
                this.pots = await potsSesrvice.getAllPots();
            } catch (error) {
                console.error("Failed to fetch pots:", error);
            } finally {
                this.loading = false;
            }
        },

        async addPot(potData) {
            try {
                const newPot = await potsSesrvice.createPot(potData);
                this.pots.push(newPot);
            } catch (error) {
                console.error("Failed to add pot:", error);
            }
        },
        
        async addMoneyToPot(potId, potData) {
            try {
                const updatedPot = await potsSesrvice.addFunds(potId, potData);
                const index = this.pots.findIndex(p => p.id === potId);
                if (index !== -1) {
                    this.pots[index] = updatedPot;
                }
            } catch (error) {
                console.error("Failed to add funds to pot:", error);
            }
        },

        async withdrawMoneyFromPot(potId, potData) {
            try {
                const updatedPot = await potsSesrvice.withdrawFunds(potId, potData);
                const index = this.pots.findIndex(p => p.id === potId);
                if (index !== -1) {
                    this.pots[index] = updatedPot;
                }
            } catch (error) {
                console.error("Failed to withdraw funds from pot:", error);
            }
        },

        async deletePot(potId) {
            try {
                await potsSesrvice.deletePot(potId);
                this.pots = this.pots.filter(p => p.id !== potId);
            } catch (error) {
                console.error("Failed to delete pot:", error);
            }
        }
    },
});     