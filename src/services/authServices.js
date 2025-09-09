import axiosET  from "../config/axiosinstance.js";
import { jwtDecode } from "jwt-decode";


export async function loginUser(LoginData) {
    const email = LoginData.email;
    const password = LoginData.password;
    try {
        const response = await axiosET.post('/api/auth/jwt/create/', { email, password });

        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        console.log(response);

        console.log("access:", typeof response.data.access, response.data.access)
        console.log("refresh:", typeof response.data.refresh, response.data.refresh)

        const decodedToken = jwtDecode(accessToken);

    return { accessToken, refreshToken, decodedToken };
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}