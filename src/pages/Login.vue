<script setup>

import Inputs from "../components/ui/Inputs.vue";
import { ref } from "vue";
import Button from "../components/ui/Button.vue";
const email = ref("");
const password = ref("");
import { useAuthStore} from "../store/authStore.js";

import { useRouter } from "vue-router";


const router = useRouter();
const authStore = useAuthStore();
const formData = ref({
  email: "",
  password: ""
})
const loading = ref(false); 



const onLogin = async () => {
  loading.value = true;

  try {
    formData.value.email = email.value;
    formData.value.password = password.value;

    const success = await authStore.login(formData.value);
    if (success) {
      router.push("/");
    } else {
      alert("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  } finally {
    loading.value = false;
  }



}

</script>

<template>
 <article>
   <section class="container">
      <h1>Login</h1>
      <p>Welcome back!Please login to your account.</p>

      <form @submit.prevent="!loading && onLogin()">
        <Inputs type="email" v-model="email" placeholder="Enter your email"  />
        <Inputs type="password" v-model="password" placeholder="Enter your password" icon="fas fa-lock" />
        <Button 
          variant="primary"
          class="btn-login" 
          :disabled="loading"
        >
          <span v-if="loading" >
            <svg
  v-if="loading"
  width="18"
  height="18"
  viewBox="0 0 50 50"
>
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="white"
    stroke-width="5"
    stroke-linecap="round"
    stroke-dasharray="31.4 31.4"
    transform="rotate(-90 25 25)"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.8s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

          </span>
          <span v-else>Login</span>
      </Button>
      <p>Don't have an account?<a href="/auth/register">Register</a></p>
       

      </form>

   </section>
 </article>
</template>

<style scoped>
.btn-login{
  width: 100%;
  margin-top: 1rem;
}
 article {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f5f5f5;
}
.container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  height: 90%;
  text-align: center;
  overflow: hidden;
}
:deep(.spinner) {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  background:red;
}

@keyframes spin {
 
  to {
    transform: rotate(360deg);
  }
}
</style>