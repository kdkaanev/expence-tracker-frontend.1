import axiosET from "../config/axiosinstance.js"
import {jwtDecode} from "jwt-decode";  // ✅ default import, без { }

// Login user
export async function loginUser({ email, password }) {
  const res = await axiosET.post("api/auth/jwt/create/", { email, password })

  const accessToken = res.data.access
  const refreshToken = res.data.refresh

  // Декодираме токена за user info
  const decodedToken = jwtDecode(accessToken)

  return { accessToken, refreshToken, decodedToken }
}

// Register user
export async function registerUser({ email, password, re_password }) {
  const res = await axiosET.post("api/auth/users/", { email, password, re_password })
  return res.data
}
