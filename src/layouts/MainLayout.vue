<script setup>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
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
        <!--<NavBar />-->
        <SideBar />
        <main class="content">
            <router-view />
        </main>
    </div>
 
</template>

<style scoped>

.protected-layout {
    display: flex;
    height: 100vh;
    background-color: var(--bg-primary);
    color: var(--text-primary);
}
.content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: var(--bg-secondary);
}
@media (max-width: 768px) {
    .content {
        padding: 1rem;
    }
    .protected-layout {
        flex-direction: column;
    }
}

</style>



