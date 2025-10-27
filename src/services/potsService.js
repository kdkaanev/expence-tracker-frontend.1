import axiosET from "../config/axiosinstance";


const potsService = {
    getAllPots: async () => {
        try {
            const response = await axiosET.get("api/pots");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createPot: async (potData) => {
        try {
            const response = await axiosET.post("api/pots/", potData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    addFunds: async (potId, potData) => {
        try {
            const response = await axiosET.put(`api/pots/${potId}/add_funds/`, potData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    withdrawFunds: async (potId, potData) => {
        try {
            const response = await axiosET.put(`api/pots/${potId}/withdraw_funds/`, potData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}
export default potsService;


