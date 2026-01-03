<script setup>
    import Inputs from "../components/ui/Inputs.vue";
    import { ref } from "vue";
    import Button from "../components/ui/Button.vue";
    import {useAuthStore} from "../store/authStore.js";
    import router from "../router/index.js";


    const email = ref("");
    const password = ref("");
    const re_password = ref("");
    const authStore = useAuthStore();
    const formData = ref({
      email: "",
      password: "",
      re_password: ""
    })


    const onRegister = async () => {
        formData.value.email = email.value
        formData.value.password = password.value
        formData.value.re_password = re_password.value
        if(formData.value.password !== formData.value.re_password){
            alert("Паролите не съвпадат")
            return
        }
        try {
         await authStore.register(formData.value);
          alert("Регистрацията е успешна")

          email.value = ""
          password.value = ""
          re_password.value = ""


        }catch (error) {
          alert("Регистрацията не бе успешна. Моля, опитайте отново.")
        }
        if (authStore.isAuthenticated){
            router.push("/")
            return
        }
        router.push("/auth/login")


    }
</script>

<template>
    <article>
    <section class="container">
        <div class="icon">
            <i class="fa-solid fa-user" style="color: #2D9CDB;" ></i>
        </div>
        <h1>Регистрация</h1>
        <p>Създайте своя акаунт</p>
    
        <form @submit.prevent="onRegister">
            <Inputs type="email" v-model="email" placeholder="Имейл" icon="fas fa-envelope" />
            <Inputs type="password" v-model="password" placeholder="Парола" icon="fas fa-lock" />
            <Inputs type="password" v-model="re_password" placeholder="Потвърдете паролата" icon="fas fa-lock" />
            <Button variant="primary" class="btn-login" type="submit">Регистрация</Button>
            <p>Вече имате акаунт?<a href="/auth/login">Вход</a></p>
        </form>
    </section>
    </article>
</template>

<style scoped>
    .btn-login{
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: #2D9CDB;
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
        align-content: center;
        height: 90%;
        text-align: center;
        overflow: hidden;
    }
    .icon {
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1rem;
        background-color: #deedf6;
        width: 80px;
        height: 80px;
        border-radius: 100%;
    }
    a{
        color: #2D9CDB;
        text-decoration: none;

        margin-left: 5px;
    }
</style>