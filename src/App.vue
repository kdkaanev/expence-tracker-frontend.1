<script setup>
import MainLayout from "./layouts/MainLayout.vue";
import {useAuthStore} from "./store/authStore.js";

const authStore = useAuthStore();

authStore.initAuth()
</script>


<template>

  <router-view />

</template>