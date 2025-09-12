<script setup>
import { useAuthStore } from "../store/authStore";
const authStore = useAuthStore();
</script>



<template>
     <aside class="sidebar">
        <button class="primary"><span class="lether">F</span></button>
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
.primary {
        background-color: #2D9CDB;

    color: white;
    border: none;
    width: 40px;
    height: 40px;

    font-weight: bold;
    cursor: pointer;
    text-align: center;
}


</style>