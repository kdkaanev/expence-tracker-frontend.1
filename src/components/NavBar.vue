<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Profile from "../pages/Profile.vue";
import  { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const router = useRouter();
const showProfilePopUp = ref(false);
const popupRef = ref(null);

 const name = ref('');
const getFirstLetter = (name) => {
    if (!name) return 'A';
    return name.charAt(0).toUpperCase();
};

const toggleProfilePopUp = () => {
    showProfilePopUp.value = !showProfilePopUp.value;
};

const handleClickOutside = (event) => {
    if (popupRef.value && !popupRef.value.contains(event.target)) {
        showProfilePopUp.value = false;
    } 
};

onMounted(() =>  {
    
    document.addEventListener("click", handleClickOutside);
});


onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>



<template>
     <aside class="sidebar">
        <button 
            class="primary"
            @click.stop="toggleProfilePopUp"
            >
            <span class="lether">{{ getFirstLetter(name) }}</span>
        </button>
        <div 
            v-if="showProfilePopUp"
            ref="popupRef"
           
            >
            <Profile />     
        </div>
            <nav class="menu">
                
                    <router-link to="/" class="link">Dashboard</router-link>
                    <router-link to="/transactions" class="link">Transactions</router-link>
                    <router-link to="/budget" class="link">Budget</router-link>
                    <router-link to="/pots" class="link">Pots</router-link>
              

                   
                

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
    

    color: white;
    border: none;
    width: 40px;
    height: 40px;

    font-weight: bold;
    cursor: pointer;
    text-align: center;
}
.primary:hover {
    background-color: #219150;
}

</style>