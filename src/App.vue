<script setup>
import { onMounted } from "vue"
import { useAuthStore } from "./store/authStore.js"
import { useBudgetStore } from "./store/budgetStore.js"
import { useTransactionStore } from "./store/transactionsStore.js"
import { useCategoryStore } from "./store/categoryStore.js"
import MainLayout from "./layouts/MainLayout.vue"
import AuthLayout from "./layouts/AuthLayout.vue"

const authStore = useAuthStore()
const budgetStore = useBudgetStore()
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()

// Fetch initial data when the app is mounted

</script>

<template>
  <router-view />
</template>
