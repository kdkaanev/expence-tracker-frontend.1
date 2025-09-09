import axios from 'axios';
import {useAuthStore} from "../store/authStore.js";

const axiosET = axios.create({
  baseURL: '  http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosET.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
},
(error) => {
    return Promise.reject(error)
})

export default axiosET;