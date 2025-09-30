import axiosET from "../config/axiosinstance.js"
import { jwtDecode } from "jwt-decode";

export async function getAllCategories() {
    const res = await axiosET.get("/api/categories");
}