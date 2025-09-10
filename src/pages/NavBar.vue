<script setup>
import { useAuthStore } from "../store/authStore.js"
const authStore = useAuthStore();
</script>



<template>
     <aside class="sidebar">
        <button class="primary">F</button>
            <nav class="menu">
                
                    <router-link to="/" class="link">Dashboard</router-link>
                    <router-link to="/transactions" class="link">Transactions</router-link>
                    <router-link to="/budget" class="link">Budget</router-link>
                    <router-link to="/pots" class="link">Pots</router-link>
                    <router-link to="/recuring" class="link">Recuring</router-link>
                    <a class="link" @click="authStore.logout">Logout</a>
                   
                

            </nav>
            
        </aside>
</template>

<style scoped>
.sidebar {
   display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
}
.menu {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 1rem;
    text-decoration: none;
}
a {
    cursor: pointer;
}
.link {
    text-decoration: none;
    color: black;
}

</style>