import { defineStore } from 'pinia';
import axiosET from '../config/axiosinstance';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        loading: false,
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            try {
                const response = await axiosET.get('api/categories');
                this.categories = response.data;
                this.loading = false;
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                this.loading = false;
            }    
        },
        async createCategory(categoryData) {
            try {
                const response = await axiosET.post('api/categories/', categoryData);
                this.categories.push(response.data);
            } catch (error) {
                console.error('Error creating category:', error);
            }
        },
        async updateCategory(categoryId, updatedData) {
            try {
                const response = await axiosET.put(`/categories/${categoryId}`, updatedData);
                const index = this.categories.findIndex(cat => cat.id === categoryId);
                if (index !== -1) {
                    this.categories[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating category:', error);
            }
        },
        async deleteCategory(categoryId) {
            try {
                await axiosET.delete(`/categories/${categoryId}`);
                this.categories = this.categories.filter(cat => cat.id !== categoryId);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    },
});

    
