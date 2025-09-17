import { defineStore } from "pinia"
import { loginUser, registerUser } from "../services/authServices.js"
import router from "../router/index.js";

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

      return true
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
      router.push("/auth")


    },

    // Инициализация при startup

    async initAuth() {
      if (!this.isInitialized) return
      this.isInitialized = true

      const access = localStorage.getItem("access")
      const refresh = localStorage.getItem("refresh")
      if (!access) return

      this.accessToken = access
      this.refreshToken = refresh

      // Извикваме /users/me/ само веднъж при startup
      try {
        const res = await import("../config/axiosinstance.js").then(m => m.default)
        const response = await res.get("/auth/users/me/", {
          headers: { Authorization: `Bearer ${access}` }
        })
        this.user = response.data
      } catch {
        this.logout()
      }
    },
  },
})
