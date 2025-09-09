<script setup>
    import Inputs from "../components/ui/Inputs.vue";
    import { ref } from "vue";
    import Button from "../components/ui/Button.vue";

   
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
</script>

<template>
    <article>
    <section class="container">
        <div class="icon">
            <i class="fa-solid fa-user" style="color: #2D9CDB;" ></i>
        </div>
        <h1>Register</h1>
        <p>Create your account</p>
    
        <form >
            <Inputs type="email" v-model="email" placeholder="Email" icon="fas fa-envelope" />
            <Inputs type="password" v-model="password" placeholder="Password" icon="fas fa-lock" />
            <Inputs type="password" v-model="confirmPassword" placeholder="Confirm Password" icon="fas fa-lock" />
            <Button variant="primary" class="btn-login">Register</Button>
            <p>Already have an account?<a href="/login">Login</a></p>
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