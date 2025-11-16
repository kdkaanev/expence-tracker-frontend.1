<script setup>
    import { ref, onMounted, watch, nextTick, computed, } from "vue";
    import { storeToRefs } from 'pinia'

    import { useTransactionStore } from "../store/transactionsStore.js";
    import { useCategoryStore } from "../store/categoryStore.js";
    import Button from "../components/ui/Button.vue";
    import { categoryIcons } from "../services/categoryIcons.js";
    import { format } from "date-fns";
    import TransactionFilter from "../components/TransactionFilter.vue";
    





    

    const transactionStore = useTransactionStore();
   
    const categoryStore = useCategoryStore();
    const isSubmitting = ref(false)
    const showModal = ref(false);
    const editMode = ref(false);
    const showCategoryModal = ref(false);
    const selectedCategory = ref("");
    const newCategoryName = ref("");
    const addFormRef = ref(null);
    const categoryModalRef = ref(null);

    const transactions =computed(() => transactionStore.transactions);
    const categories = computed(() => {
    const unique = new Map();
    transactions.value.forEach(t => {
        if (!unique.has(t.category)) {
            unique.set(t.category, { id: t.category, name: t.category_name });
        }
    });
    return Array.from(unique.values());
});
    const casualCategories = [
        'Food',
        'Entertainment',
        'Shopping',
        'Travel',
        'Health',
        'Salary',
        'Gifts & Donations',
        'Education',
        'Transport'
    ]

    const formData = ref({
        id: null,
        description: "",
        transaction_date: "2025-09-18T12:34:56.789Z",
        amount: 0,
        category: casualCategories,
        type: ""
    });
    const formDataCategory = ref({
        id: null,
        name: "",
        
    });

    const filters = ref({
        category: "",
        startOfDay: "",
        endOfDay: ""
    });
const handleFilterUpdate = (newFilters) => {
    filters.value = newFilters
};

const filteredTransactions = computed(() => {
   return transactions.value.filter(t => {
        const matchCategory = !filters.value.category || t.category === Number(filters.value.category);
        const transactionDate = new Date(t.transaction_date);
        const matchStart = !filters.value.startOfDay || transactionDate >= new Date(filters.value.startOfDay);
        const matchEnd = !filters.value.endOfDay || transactionDate <= new Date(filters.value.endOfDay);

        return matchCategory && matchStart && matchEnd;
    });
});

    




    onMounted(async() => {
        await transactionStore.fetchTransactions();
        await categoryStore.fetchCategories();
    })

    const openAddModal = async () => {
        editMode.value = false;
        formData.value = {
            id: null,
            description: "",
            transaction_date: "",
            amount: 0,
            category: ""
        };
        showModal.value = true;
        await nextTick();
        if (addFormRef.value) {
            addFormRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const openEditModal = async(transaction) => {
        editMode.value = true;
        formData.value = { ...transaction };
        showModal.value = true;
              await nextTick();
        if (addFormRef.value) {
            addFormRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const closeModal = () => {
        showModal.value = false;
    };

  

    const saveTransaction = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
      try {
         if (formData.value.amount <= 0 || !formData.value.transaction_date || !formData.value.category) {
           alert("Please fill all fields correctly.");
           return;
       }
       formData.value.transaction_date = format(new Date(formData.value.transaction_date), "yyyy-MM-dd");
       if (editMode.value) {
           await transactionStore.updateTransaction(formData.value.id, formData.value);
           
       } else {
           await transactionStore.addTransaction(formData.value);
       }
      }finally {
        isSubmitting.value = false;
        showModal.value = false;
      }
    };

    const deleteTransaction = async (id) => {
        if (confirm("Are you sure you want to delete this transaction?")) {
           await transactionStore.deleteTransaction(id);
        }
    };
   
    const { positiveTransactions, negativeTransactions } = storeToRefs(transactionStore);

    

    
    const addCategory = async () => {
        if (!newCategoryName.value) {
            alert("Category name cannot be empty.");
            return;
        }
        if (isSubmitting.value) return;
        isSubmitting.value = true;
        try {
            await categoryStore.createCategory({
                name: newCategoryName.value ,
                type: formDataCategory.value.type
                
                });
            newCategoryName.value = "";
            showCategoryModal.value = false;
            await categoryStore.fetchCategories(); // Refresh categories after adding a new one
        } finally {
            isSubmitting.value = false;
        }
        
       
    };
    function getIcon(categoryName) {
      return categoryIcons[categoryName] || "tag"; // по подразбиране tag
}

   
   

    watch(() => formData.value.category, (newVal) => {
        if (newVal === "__add__") {
            showCategoryModal.value = true;
            selectedCategory.value = "";
        }
        nextTick(() => {
            if (categoryModalRef.value) {
                categoryModalRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }); 
</script>

<template>
    <article>
        <section class="container">
            <h1 class="text">Transactions</h1>
            <div>
                <TransactionFilter
                :categories="categories"
                :selectedCategory="filters.category"
                :startOfDay="filters.startOfDay"
                :endOfDay="filters.endOfDay"
                @update:filter="handleFilterUpdate"
            />

            
            </div>
            
          


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
                   <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="info">
                   <!-- <tr v-for="transaction in transactions" :key="transaction.id"> -->
                        <td><div class="cat-name">
                          <font-awesome-icon
                            :icon="getIcon(transaction.category_name)"
                            class="icon"
                        /><span class="capitalize">{{transaction.category_name}}</span>
                        </div> </td>
                        <td>{{ transaction.transaction_date}}</td>
                        <td>{{ transaction.description }}</td>

                      <td>
                        <span class="amount" :class="{ 'negative': negativeTransactions.includes(transaction) , 'positive': positiveTransactions.includes(transaction) }">
                        {{ negativeTransactions.includes(transaction) ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                    </span>
                </td>
                       
                        
                        <td class="center">
                            <button class="transparant" @click="openEditModal(transaction)">✏️</button>
                            <button class="transparant" @click="deleteTransaction(transaction.id)">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
              <Button class="btn-add"
                variant="primary"
                @click="openAddModal"
            >Add Transaction
        </Button>
            <section v-if="showModal" class="modal" ref="addFormRef">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>{{ editMode ? 'Edit Transaction' : 'Add Transaction' }}</h2>
                  <label>Description:</label>
                    <input type="text" v-model="formData.description" placeholder="Description" />
                    <label>Date:</label>
                   <input type="date" v-model="formData.transaction_date" />
                   <label>Amount:</label>
                   <input type="number" v-model="formData.amount" placeholder="Amount" />
                    <label >Transaction Type:</label>
                   <select v-model="formData.type">
                        <option disabled value="">Select </option>
                       <option value="income">Income</option>
                       <option value="expense">Expense</option>
                   </select>
                     <label>Category:</label>
                     <select v-model="formData.category">
                        <option disabled value="">Select Category</option>
                        
                       
                          <option class="capitalize" v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                          </option>
                          <option
                              value="__add__"
                          >+ Add New Category
                          </option>
                     </select>
                 
                     <div class="btn">
                        <Button variant="primary" @click="saveTransaction">Save</Button>
                        <Button variant="secondary" @click="closeModal">Cancel</Button>
                     </div>
                     <div v-if="showCategoryModal" class="modal-category" ref="categoryModalRef">
                         
                        <!-- Category Modal Content Here -->
                         <div class="modal-content">
                            <span class="close" @click="showCategoryModal=false">&times;</span>
                            <h2>Add New Category</h2>
                            <input type="text" v-model="newCategoryName" placeholder="Category Name" />
                            
                        
                            <div class="btn">
                                <Button variant="primary" @click="addCategory">Add Category</Button>
                                <Button variant="secondary" @click="showCategoryModal = false">Cancel</Button>
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
.btn-add{
    width: 100%;
  margin-top: 1rem;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
.negative {
    color: red;
}
.positive {
    color: green;
}
.amount {
    font-weight: bold;
    font-size: 1.1rem;
    
}

@media (max-width: 760px) {
    .info{
       display:flex;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid #ddd;
        padding: 0.5rem;
        margin-bottom: 1rem;
        justify-content: space-between;
    }
    td {
        text-align: center;
    }
    
    .filter{
        flex-direction: column;
        gap: 1rem;
    }
    .th-text{
        display: none;
    }
    .thead{
        display: none;  
    
    }
}

</style>