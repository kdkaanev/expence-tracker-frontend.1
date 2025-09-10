<script setup>
import NavBar from "../pages/NavBar.vue";
import { useAuthStore } from "../store/authStore";
import DashBoard from "../pages/DashBoard.vue";


const authStore = useAuthStore();

</script>



<template>
    <div class="protected-layout">
        <NavBar />
        <main class="content">
            <router-view />
        </main>
    </div>
 
</template>



