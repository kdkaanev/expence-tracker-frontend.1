import axios from "axios"

const axiosET = axios.create({
    //baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://expencetracker-aqhzd2fvfnhaaydd.northeurope-01.azurewebsites.net',


  headers: { "Content-Type": "application/json" },
})

// Request interceptor
axiosET.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access")
    // public endpoints: register, login, refresh
    const isPublicUrl =
      config.url === "/auth/users/" ||
      config.url === "/auth/jwt/create/" ||
      config.url === "/auth/jwt/refresh/"

    if (access && !isPublicUrl) {
      config.headers.Authorization = `Bearer ${access}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor с refresh token
axiosET.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const refresh = localStorage.getItem("refresh")
      if (!refresh) return Promise.reject(error)

      try {
        const res = await axiosET.post("api/auth/jwt/refresh/", { refresh })
        const newAccess = res.data.access
        localStorage.setItem("access", newAccess)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return axiosET(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem("access", newAccess)
        localStorage.removeItem("refresh", refresh)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosET
