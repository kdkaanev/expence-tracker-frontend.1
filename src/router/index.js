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
import EditProfile from "../components/EditProfile.vue";



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
    meta: { requiresAuth: true },
    children: [
      {path: "", name:'dashboard', component: DashBoard},
      {path: "transactions", name:'transactions', component: Transactions},
      {path: "budget", name:'budget', component: Budget},
      { path: "pots", name:'pots', component: Pots},
      { path: "recuring", name:'recuring', component: Recuring},
      { path: "profile", name:'profile', component: Profile},
      { path: "edit-profile", name:'editprofile', component: EditProfile},
    ]

  },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to , from, next) => {
    const authStore = useAuthStore();

    const access =localStorage.getItem("access");
    if (access && !authStore.user) {
        try {
            await authStore.initAuth();

        }catch {
            authStore.logout();
        }
    }

    if (to.meta.requiresAuth && !authStore.accessToken) {
      return next("auth");
    }

    if (!to.meta.requiresAuth && authStore.accessToken && (to.name === "login" || to.name === "register")) {
    return next("/");
  }
    next();
})



export default router;
