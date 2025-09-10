import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Transactions from "../pages/Transactions.vue";
import  {useAuthStore} from "../store/authStore";
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import DashBoard from "../pages/DashBoard.vue";
import Budget from "../pages/Budget.vue";
import Pots from "../pages/Pots.vue";
import Recuring from "../pages/Recuring.vue";
import Profile from "../pages/Profile.vue";



const routes = [
  { path: "/auth",
     component: AuthLayout,
      meta: { requiresAuth: false },
     children: [
      {path: "",name:'home', component: Home, },
      { path: "login",name:'login', component: Login },
      { path: "register",name:'register', component: Register },
     ]

   },
  { 
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: false },
    children: [
      {path: "", name:'dashboard', component: DashBoard},
      {path: "transactions", name:'transactions', component: Transactions},
      {path: "budget", name:'budget', component: Budget},
      { path: "pots", name:'pots', component: Pots},
      { path: "recuring", name:'recuring', component: Recuring},
      { path: "profile", name:'profile', component: Profile},
    ]

  },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to , from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth) {
      const ok = await authStore.initAuth();
      if (!ok) return next('/auth');
    }
    next();
})



export default router;
