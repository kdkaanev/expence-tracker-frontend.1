<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Button from "../components/ui/Button.vue";
</script>

<template>
  <article>
    <section class="container">
      <div class="header">

        <div class="header-left">
          <h1 class="title">Manage your finances easily</h1>
          <p class="subtitle">Track your expenses, set budget</p>
        </div>
        <img src="../assets/logo-finance.png" alt="Finance Illustration" class="illustration"/>

      </div>
      <div class="btn-first">
       <Button variant="primary" @click="handleRegister">
  Sign Up
</Button>

        <Button variant="secondary" @click="handleLogin">
  Login
</Button>
      </div>
      <section class="content">

        <h3 class="title">Features</h3>
        <div class="grid">
          <div class="grid-left">
            <div class="card">
              <img src="../assets/newspaper-solid-full.svg" alt="Finance Illustration" class="page"/>
              <p class="card-description">Track expenses in real time</p>
            </div>
            <div class="card">
              <img src="../assets/bullseye-solid-full.svg" alt="Finance Illustration" class="page"/>
              <p class="card-description">Set budgets and goals</p>
            </div>
          </div>
          <div class="grid-right">
            <div class="card">
              <img src="../assets/square-poll-vertical-solid-full.svg" alt="Finance Illustration" class="page"/>
              <p class="card-description">Get clear charts and analyses</p>
            </div>
            <div class="card">
              <img src="../assets/piggy-bank-solid-full.svg" alt="Finance Illustration" class="page"/>
              <p class="card-description">Save with Pots</p>
            </div>
          </div>
        </div>
        <div class="btn-second">
          <Button variant="primary">Get started for free</Button>
          <Button variant="secondary">Login</Button>

        </div>

      </section>
    </section>
  </article>
</template>

<style scoped>
.grid{
  align-items: center;
  justify-items: center;
  gap: 5px;
}
.grid-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.grid-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.content {
  margin-top: 100px;


}
.title {

  font-weight: bold;
  margin-bottom: 20px;
  text-align: start;

}
.btn-first{
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  pading-top: 20px;

}
.btn-second{
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  pading-top: 20px;
}
.header-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pading-top: 20px;
  margin-top: 20px;
}
.illustration {
  width: 300px;
  height: 450px;
  object-fit: contain;
  margin-right: 48px;
  overflow: hidden;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: 200px;
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
.page {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;

}
</style>