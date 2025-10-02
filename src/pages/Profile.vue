<script setup>
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button.vue";

const userStore = useAuthStore();

</script>


<template>
    <div class="pop-up">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {{ userStore.user.user_id }}</p>
        <p><strong>Email:</strong> kk@kk.kk</p>
        
  
       
        <!-- Add more user details as needed -->
    </div>

</template>


<style scoped>
.pop-up {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 250px;
}
</style>