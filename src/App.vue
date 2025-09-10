<script setup>
import { onMounted } from "vue"
import { useAuthStore } from "./store/authStore.js"
import MainLayout from "./layouts/MainLayout.vue"
import AuthLayout from "./layouts/AuthLayout.vue"

const authStore = useAuthStore()

// Инициализира store само веднъж при стартиране
onMounted(() => {
  authStore.initAuth()
})
</script>

<template>
  <router-view />
</template>
