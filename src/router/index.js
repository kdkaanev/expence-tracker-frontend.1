import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Transactions from "../pages/Transactions.vue";
import  {useAuthStore} from "../store/authStore.js";


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
router.beforeEach(async (to , from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth) {
      const ok = await authStore.checkAuth();
      if (!ok) return next('/login');
    }
    next();
})



export default router;
