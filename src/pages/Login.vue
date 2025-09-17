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
const onLogin = async () => {

  formData.value.email = email.value;
  formData.value.password = password.value;
  const success = await authStore.login(formData.value);

  if (success) {
    // Redirect to dashboard or another page after successful login
    router.push("/");
  } else {
    alert("Login failed. Please check your credentials.");
  }


}
</script>

<template>
 <article>
   <section class="container">
      <h1>Login</h1>
      <p>Welcome back!Please login to your account.</p>

      <form @submit.prevent="onLogin">
        <Inputs type="email" v-model="email" placeholder="Enter your email"  />
        <Inputs type="password" v-model="password" placeholder="Enter your password" icon="fas fa-lock" />
        <Button variant="primary" class="btn-login">Login</Button>
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
</style>