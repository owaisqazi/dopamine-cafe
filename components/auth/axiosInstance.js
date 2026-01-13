// src/api/axiosInstance.js
import axios from "axios";
//@ts-ignore
import Cookies from "js-cookie";
export const API_BASE_URL = "https://practice.devssh.xyz/api";
export const IMAGE_BASE_URL = "https://practice.devssh.xyz/storage/";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
