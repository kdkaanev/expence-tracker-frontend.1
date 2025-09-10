<script setup>
    import { useAuthStore } from '../store/authStore';
    import NavBar from './NavBar.vue';
    const authStore = useAuthStore();

</script>

<template>
    
       
        <section class="dashboard">
           
            <h1>Welcome, {{ authStore.user?.email }}</h1>
            <div class="card">
                <h2>Your Profile</h2>
                <ul>
                    <li><strong>Email:</strong> {{ authStore.user?.email }}</li>
                    <li><strong>User ID:</strong> {{ authStore.user?.id }}</li>
                </ul>
            </div>
        </section>
    
</template>

<style scoped>
.dashboard {
    padding: 2rem;
}
.card {
    background: #f9f9f9;
    border: 1px;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>

