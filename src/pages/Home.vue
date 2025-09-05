<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <article>
    <section class="container">
      <div class="header">


        <img src="../assets/main-image.png" alt="Finance Illustration" class="illustration"/>

      </div>
      <div class="buttons">
        <button class="btn primary">SignUp</button>
        <button class="btn secondary">Login</button>
      </div>
      <section class="content">

        <h1 class="title">Features</h1>
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
        <div class="buttons">
          <button class="btn primary">Get started for free </button>
          <button class="btn secondary">Login</button>

        </div>

      </section>
    </section>
  </article>
</template>

<style scoped>
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
  width: 400px;
  height: 90%;
  text-align: center;
}
.page {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;

}
</style>