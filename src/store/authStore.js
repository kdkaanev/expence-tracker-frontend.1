import { defineStore } from "pinia"
import { loginUser, registerUser, currentUser } from "../services/authServices.js"
import { jwtDecode}  from "jwt-decode";
import {useRouter} from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isInitialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async login(loginData) {

      const { accessToken, refreshToken, decodedToken } = await loginUser(loginData)
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.user = decodedToken

      localStorage.setItem("access", accessToken)
      localStorage.setItem("refresh", refreshToken)

      return true;


    },

    async register(registerData) {
      await registerUser(registerData)        // POST /users/ → 1
      await this.login({                                   // POST /jwt/create/ → 2
        email: registerData.email,
        password: registerData.password,
      })

    },

    logout() {

      this.accessToken = null
      this.refreshToken = null
      this.user = null
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")



    },
    async fetchCurrentUser(){
        const response = await currentUser()
        this.user = response;

      return true;
    },

    // Инициализация при startup

    async initAuth() {
      const access = localStorage.getItem("access")
      if (!access) return false;
      try {
        this.accessToken = access;
        this.refreshToken = localStorage.getItem("refresh");
        this.user = jwtDecode(access);
        return true;
      }catch {
        this.logout();
        return false;
      }





      // Извикваме /users/me/ само веднъж при startup

      }
    },

})
