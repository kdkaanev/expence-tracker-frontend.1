<script setup>
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button.vue";
import  { useRouter } from "vue-router";
import {onMounted} from "vue";



const authStore = useAuthStore();
const router = useRouter();


const onLogout = async () => {
    await authStore.logout();
    router.push("/auth");
};
 onMounted(async() => {
        await authStore.fetchCurrentUser()

    });

const goToEdit = () => {



    router.push("/edit-profile");
};
</script>


<template>
    <div class="pop-up">
        <h2>User Profile</h2>
        <div v-if="authStore.user.profile">
          <p><strong>First Name:</strong> {{ authStore.user.profile.first_name }}</p>
        <p><strong>Last Name:</strong> {{ authStore.user.profile.last_name }}</p>
        <p><strong>Email:</strong> kk@kk.kk</p>
        <div class="link">
            <a  @click="onLogout">logout</a>
            <a @click="goToEdit">edit</a>

        </div>


    
       
        <!-- Add more user details as needed -->
    </div>
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
a {
    color: #0172ad;
    cursor: pointer;
    text-decoration: none;
}
a:hover {
    color: #27ae60;;

}
.link {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}
</style>