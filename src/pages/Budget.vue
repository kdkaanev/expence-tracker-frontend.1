<script setup>
import { categoryIcons } from '../services/categoryIcons';
import DonuutChart from '../components/charts/DonuutChart.vue';

import Button from '../components/ui/Button.vue';
import BarChart from '../components/charts/BarChart.vue';
import HorizontalBar from '../components/charts/HorizontalBar.vue';
import { computed, nextTick, onMounted, watchEffect } from 'vue';
import { useBudgetStore } from '../store/budgetStore';
import { ref } from 'vue';
import { useTransactionStore } from '../store/transactionsStore';
import { useCategoryStore } from '../store/categoryStore';
import {generateColorShades} from '../utiles/generateColor.js';
import { storeToRefs } from 'pinia';
import { babelParse } from 'vue/compiler-sfc';
const budgetStore = useBudgetStore();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
const addFormRef = ref(null);
const chartColors = ref([]);
const { budgets } = storeToRefs(budgetStore);
const { daysOfMonth, dailyExpenses } = storeToRefs(transactionStore);
const editMode = ref(false);
const showModal = ref(false);

const budget = budgetStore.budgets;

const formBudget = ref({
    id: null,
    category: '',
    amount: 0,
});
const categories = computed(() => categoryStore.categories);
onMounted(async() => {
        await budgetStore.fetchBudgets();
        await transactionStore.fetchTransactions();
        await categoryStore.fetchCategories();
    })



const openEditModal = (budget) => {
        editMode.value = true;
        formBudget.value = {
            id: budget.id,
            category: budget.category,
            amount: budget.amount,
        };
        showModal.value = true;
    };  
const openModal = async() => {
        editMode.value = false;
    formBudget.value = {
        category: '',
        amount: 0,
    };
        showModal.value = true;
 await nextTick();
        if (addFormRef.value) {
        addFormRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

const closeModal = () => {
        showModal.value = false;
    };


const addBudget = async() => {
        if (editMode.value) {
            await budgetStore.updateBudget(formBudget.value);
        } else {
            await budgetStore.addBudget(formBudget.value);
        }
        closeModal();
    };
        function getIcon(categoryName) {
      return categoryIcons[categoryName] || "tag"; // по подразбиране tag
}

watchEffect(() => {
    chartColors.value = generateColorShades(120, budgets.value.length);
});





const chartData = computed(() => ({
    labels: budgets.value.map(b => b.category_name),
    datasets: [
        {
            data: budgets.value.map(b => b.amount),
            backgroundColor: chartColors.value,
            borderWidth: 1,
        },
    ]
}));



    const barData = computed(() => ({
        labels: daysOfMonth.value.map(day => day.split('-')[2]),
        datasets: [
            {
                label: Date().toLocaleString('default', { month: 'long' }),
                backgroundColor: '#22c55e',
                data: dailyExpenses.value,
                borderRadius: 8,
            },
        ],
    }));


    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Daily Expenses',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    

    const budgetStatus = (category) => {
        const budget = budgetStore.budgets.find(b => b.category === category);
        if (budget) {
         
            let used = ((Number(budget.spent) / Number(budget.amount)) * 100).toFixed(0);
            used = Number(used);
            return { used: used > 100 ? 100 : used, remaining: budget.amount - budget.spent };
        }
        console.log(used, remaining);
        
        return { used: 0, remaining: 0 };
    };
    const totalBudget = computed(() => {
        let total = budgetStore.budgets.reduce((sum, b) => sum + Number(b.amount), 0);
        return `€${total.toFixed(2)}`;
    });

    const deleteBudget = async(id) => {
        if (confirm('Are you sure you want to delete this budget?')) {
            await budgetStore.deleteBudget(id);
        }
    };
    nextTick(() => {
        if (addFormRef.value) {
            addFormRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
</script>

<template>
    <article>
        <h1>Бюджети</h1>
        <section class="container">
            
            <div class="leftside">
                <section class="card">
                    <DonuutChart class="donut" 
                    :chart-data="chartData" 
                    
                    
                    />
                    <div class="summary">
                        <p>Общ бюджет</p>
                        <h3>{{ totalBudget }}</h3>
                    </div>
                </section>
                <section class="budget-list">
                    <div  v-for="item in budgetStore.budgets" :key="item.category" class="card budget-item">
                           <font-awesome-icon
                            :icon="getIcon(item.category_name)"
                            class="icon"
                        />
                        <div class="budget-details">
                        
                            <h3 class="capitalize">{{ item.category_name }}</h3>
                    
                            <HorizontalBar
                            :key="item.id"
                            :category="item.category"
                            :status-fn="budgetStatus"
                            mode="budget"
                            />

                            <div class="summ">
                                <p>€{{ item.spent }}</p>
                                <p>€{{ item.amount }}</p>
                            </div>
                             <div class="buttons">
                        <button class="transparant" @click="openEditModal(item)">✏️</button>
                        <button class="transparant" @click="deleteBudget(item.id)">🗑️</button>
                        
                    </div>
                        </div>
                    </div>
                </section>
               
              
                <Button 
                variant="primary"
                @click="openModal"
                >
                + Добави бюджет
                </Button>
                <section v-if="showModal" ref="addFormRef" class="card">
                    <div class="modal-content">
                        <span class="close" @click="closeModal">&times;</span>
                        <h2>{{ editMode ? 'Редактирай бюджет' : 'Добави бюджет' }}</h2>
                        <form @submit.prevent="addBudget">
                            <div class="form-group">
                                <label for="category">Категория</label>
                                <select v-model="formBudget.category" id="category" required>
                                    <option value="" disabled>Избери категория</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                </select>  
                                <label for="amount">Въведи бюджет</label> 
                                <input type="number" v-model.number="formBudget.amount" id="amount" min="1" required />
                        </div>
                            <Button class="btn" type="submit" variant="success">{{ editMode ? 'Актуализирай бюджет' : 'Добави бюджет' }}</Button>
                        </form>
                    </div>  
                    </section>
            

            </div>
            
        </section>
    </article>
</template>

<style scoped>
    .container {
   
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .leftside {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        padding-top: 2rem;
    }
    .rightside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%;
        padding-left: 20px;
        border-left: 1px solid #eee;
        padding-bottom: 1rem;

    }
    
    .budget-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 400px;
        overflow-y: auto;
    }
    .budget-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .budget-item:last-child {
        border-bottom: none;
    }
    .icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: #27ae60;
    }
    .budget-details {
        flex: 1;
    }
    .budget-details h3 {
        margin: 0;
        font-size: 1.2rem;
    }
    .budget-details p {
        margin: 2px 0;
        color: #555;
    }
    .summ {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-weight: bold;
    }
   
    .card {
        display: flex;
        flex-direction: row;
        background-color: #f9f9f9;
        gap: 2rem;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .donut{
        width: 50%;
    }
    .summary{
        display: flex;
        flex-direction: column;
        gap: 1rem;

    }
    .capitalize{
    text-transform: capitalize;
}
.btn{
    margin-top: 1rem;
    width: 100%;
}
.transparant{
    background-color: transparent;
    border: none;
    cursor: pointer;
    
   
}.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

</style>

