import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Transactions from "../pages/Transactions.vue";


const routes = [
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/transactions", component: Transactions, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
