<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useTransactionStore } from "../store/transactionsStore.js";
    import { useCategoryStore } from "../store/categoryStore.js";

    const transactionStore = useTransactionStore();
    const categoryStore = useCategoryStore();
    const showModal = ref(false);
    const editMode = ref(false);
    const showCategoryModal = ref(false);
    const selectedCategory = ref(null);
    const newCategoryName = ref("");
    const formData = ref({
        id: null,
        date: "",
        amount: 0,
        category: ""
    });
    

    onMounted(async() => {
        await transactionStore.fetchTransactions();
        await useCategoryStore.fetchCategories();
    });

    const openAddModal = () => {
        editMode.value = false;
        formData.value = {
            id: null,
            date: "",
            amount: 0,
            category: ""
        };
        showModal.value = true;
    };

    const openEditModal = (transaction) => {
        editMode.value = true;
        formData.value = { ...transaction };
        showModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    const saveTransaction = async () => {
       if (formData.value.amount <= 0 || !formData.value.date || !formData.value.category) {
           alert("Please fill all fields correctly.");
           return;
       }
       if (editMode.value) {
           await transactionStore.updateTransaction(formData.value);
       } else {
           await transactionStore.addTransaction(formData.value);
       }
    };

    const deleteTransaction = async (id) => {
        if (confirm("Are you sure you want to delete this transaction?")) {
           await transactionStore.deleteTransaction(id);
        }
    };

    const getCategotyName = (categoryId) => {
        const category = categoryStore.categories.find(cat => cat.id === categoryId);
        return category ? category.name : "Unknown";
    };
    
    const addCategory = async () => {
        if (!newCategoryName.value.trim()) {
            alert("Category name cannot be empty.");
            return;
        }
        await categoryStore.addCategory({ name: newCategoryName.value });
        newCategoryName.value = "";
        showCategoryModal.value = false;
    };
   
   

    watch(selectedCategory, (newVal) => {
        if (newVal === "__add__") {
            showCategoryModal.value = true;
            selectedCategory.value = "";
        }
    });
</script>

<template>
    <article>
        <section class="container">
            <h1 class="text">Transactions</h1>
            <button 
                class="primary"
                @click="openAddModal"
            >Add Transaction
        </button>
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th class="th-text">Date</th>
                        <th class="th-text">Category</th>
                        <th class="th-text">Amount</th>
                     
                       
                     
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactionStore.transactions" :key="transaction.id">
                        <td><i :class="transaction.icon" class="icon"></i></td>
                        <td>{{ transaction.category }}</td>
                        <td>{{ transaction.date }}</td>
                        <td>{{ getCategotyName(transaction.category) }}</td>

                      <td> {{ transaction.amount}}</td>
                       
                        
                        <td class="center">
                            <button class="primary" @click="openEditModal(transaction)">🖊️</button>
                            <button class="secondary" @click="deleteTransaction(transaction.id)">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <section v-if="showModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>{{ editMode ? 'Edit Transaction' : 'Add Transaction' }}</h2>
                    <label>Date:</label>
                   <input type="date" v-model="formData.date" />
                   <label>Amount:</label>
                   <input type="number" v-model="formData.amount" placeholder="Amount" />
                     <label>Category:</label>
                     <select v-model="selectedCategory">
                        <option disabled value="">Select Category</option>
                          <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                          </option>
                          <option value="__add__" >+ Add New Category</option>
                     </select>
                     <div class="btn">
                        <button class="primary" @click="saveTransaction">Save</button>
                        <button class="secondary" @click="closeModal">Cancel</button>
                     </div>
                     <div v-if="showCategoryModal" class="modal-category">
                        <!-- Category Modal Content Here -->
                         <div class="modal-content">
                            <span class="close" @click="closeCategoryModal">&times;</span>
                            <h2>Add New Category</h2>
                            <input type="text" v-model="newCategoryName" placeholder="Category Name" />
                            <div class="btn">
                                <button class="primary" @click="addCategory">Add Category</button>
                                <button class="secondary" @click="closeCategoryModal = false">Cancel</button>
                            </div>
                         </div>


                     </div>
                </div>
            </section>  
               

        </section>
    </article>
</template>

<style scoped>

</style>