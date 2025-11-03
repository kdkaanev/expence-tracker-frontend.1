<script setup>
import NavBar from "../components/NavBar.vue";
import { onMounted } from "vue"
import { useAuthStore } from "../store/authStore.js"

import { useBudgetStore } from "../store/budgetStore.js"
import { useTransactionStore } from "../store/transactionsStore.js"
const authStore = useAuthStore();
const budgetStore = useBudgetStore();
const transactionStore = useTransactionStore();


onMounted(async () => {
   authStore.fetchCurrentUser()
   budgetStore.fetchBudgets()
    transactionStore.fetchTransactions()
});
</script>



<template>
    <div class="protected-layout">
        <NavBar />
        <main class="content">
            <router-view />
        </main>
    </div>
 
</template>



