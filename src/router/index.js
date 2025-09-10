import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Transactions from "../pages/Transactions.vue";
import  {useAuthStore} from "../store/authStore.js";
import AuthLayout from "../layouts/AuthLayout.vue";



const routes = [
  { path: "/",
     component: AuthLayout,
     children: [
      {path: "",name:'home', component: Home, },
      { path: "login",name:'login', component: Login },
      { path: "register",name:'register', component: Register },
     ]

   },
  { path: "/transactions", component: Transactions, meta: { requiresAuth: true } },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to , from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth) {
      const ok = await authStore.initAuth();
      if (!ok) return next('/home');
    }
    next();
})



export default router;
