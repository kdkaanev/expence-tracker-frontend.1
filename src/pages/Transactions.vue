<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useTransactionStore } from "../store/transactionsStore.js";
    import { useCategoryStore } from "../store/categoryStore.js";
    import Button from "../components/ui/Button.vue";
    import { categoryIcons } from "../services/categoryIcons.js";
    

    const transactionStore = useTransactionStore();
    const categoryStore = useCategoryStore();
    const showModal = ref(false);
    const editMode = ref(false);
    const showCategoryModal = ref(false);
    const selectedCategory = ref(null);
    const newCategoryName = ref("");
    const formData = ref({
        id: null,
        description: "",
        date: "",
        amount: 0,
        category: ""
    });
    const transactions = [
    { id: 1, category: 'Grocery', amount: 50.0, created_at:'2025-09-10', description:"Very Good", type: 'expense', icon: 'fas fa-envelope' },
    { id: 2, category: 'Salary', amount: 3000.0, created_at:'2025-09-11', description: "Mnogo malka", type: 'income', icon: 'fas fa-money-bill' },
    { id: 3, category: 'Electricity Bill', amount: 100.0, created_at:'2025-09-11', description: "mnogo golqma", type: 'expense', icon: 'fas fa-bolt' },
];

    onMounted(async() => {
        await transactionStore.fetchTransactions();
        await categoryStore.fetchCategories();
    });

    const openAddModal = () => {
        editMode.value = false;
        formData.value = {
            id: null,
            description: "",
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
    function getIcon(categoryName) {
      console.log(categoryIcons[categoryName])
      return categoryIcons[categoryName] || "tag"; // по подразбиране tag
}
   
   

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
                        
                        <th class="th-text">Category</th>
                        <th class="th-text">Date</th>
                        <th class="th-text">Description</th>
                        <th class="th-text">Amount</th>
                        <th class="th-text">Edit/Delete</th>
                     
                       
                     
                    </tr>
                </thead>
                <tbody>
                   <tr v-for="transaction in transactionStore.transactions" :key="transaction.id">
                   <!-- <tr v-for="transaction in transactions" :key="transaction.id"> -->
                        <td><div class="cat-name">
                          <font-awesome-icon
                            :icon="getIcon(transaction.category_name)"
                            class="text-blue-500 w-5 h-5"
                        /><span class="capitalize">{{transaction.category_name}}</span>
                        </div> </td>
                        <td>{{ transaction.created_at}}</td>
                        <td>{{ transaction.description }}</td>

                      <td> {{ transaction.amount}}</td>
                       
                        
                        <td class="center">
                            <button class="transparant" @click="openEditModal(transaction)">✏️</button>
                            <button class="transparant" @click="deleteTransaction(transaction.id)">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <section v-if="showModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>{{ editMode ? 'Edit Transaction' : 'Add Transaction' }}</h2>
                  <label>Description:</label>
                    <input type="text" v-model="formData.description" placeholder="Description" />
                    <label>Date:</label>
                   <input type="date" v-model="formData.date" />
                   <label>Amount:</label>
                   <input type="number" v-model="formData.amount" placeholder="Amount" />
                     <label>Category:</label>
                     <select v-model="formData.category">
                        <option disabled value="">Select Category</option>
                          <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                          </option>
                          <option value="__add__" >+ Add New Category</option>
                     </select>
                     <div class="btn">
                        <Button variant="primary" @click="saveTransaction">Save</Button>
                        <Button variant="secondary" @click="closeModal">Cancel</Button>
                     </div>
                     <div v-if="showCategoryModal" class="modal-category">
                        <!-- Category Modal Content Here -->
                         <div class="modal-content">
                            <span class="close" @click="closeCategoryModal">&times;</span>
                            <h2>Add New Category</h2>
                            <input type="text" v-model="newCategoryName" placeholder="Category Name" />
                            <div class="btn">
                                <Button variant="primary" @click="addCategory">Add Category</Button>
                                <Button variant="secondary" @click="closeCategoryModal = false">Cancel</Button>
                            </div>
                         </div>


                     </div>
                </div>
            </section>  
               

        </section>
    </article>
</template>

<style scoped>
.primary{
        background-color: #27ae60;
    
}
.primary:hover {
    background-color: #219150;
    cursor: pointer;
}
.transparant{
    background-color: transparent;
    border: none;
    cursor: pointer;
    
   
}
.icon {
    margin-right: 0.5rem;
    color: #27ae60;
}
.btn {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}
.capitalize{
    text-transform: capitalize;
}
.cat-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>