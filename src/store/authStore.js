import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"
import axiosET from "../config/axiosinstance.js"
import { loginUser } from "../services/authServices.js"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!this.state.accessToken,
  },

  actions: {
    async login(loginData) {
      const { accessToken, refreshToken, decodedToken } = await loginUser(loginData)

      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.user = decodedToken

      localStorage.setItem("access", accessToken)
      localStorage.setItem("refresh", refreshToken)
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    },

    initAuth() {
      const access = localStorage.getItem("access")
      const refresh = localStorage.getItem("refresh")

      if (access) {
        this.accessToken = access
        this.refreshToken = refresh
        try {
          this.user = jwtDecode(access)
        } catch (e) {
          console.warn("Invalid token in localStorage, logging out.")
          this.logout()
        }
      }
    },

    async checkAuth() {
      if (!this.state.accessToken) return false
      try {
        const response = await axiosET.get("/api/auth/users/me/", {
          headers: { Authorization: `Bearer ${this.state.accessToken}` },
        })
        this.user = response.data
        return true
      } catch (err) {
        console.error("Auth check failed:", err)
        this.logout()
        return false
      }
    },
  },
})
