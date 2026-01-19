// src/api/axiosInstance.js
import axios from "axios";
//@ts-ignore
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const API_BASE_URL = "https://practice.devssh.xyz/api";
export const IMAGE_BASE_URL = "https://practice.devssh.xyz/storage/";

let isNetworkToastShown = false; // 🔒 guard

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// ✅ Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // 🔓 Internet wapas aa gaya → reset
    isNetworkToastShown = false;
    return response;
  },
  (error) => {
    // 🌐 Network error (no internet)
    if (!error.response) {
      if (!isNetworkToastShown) {
        toast.error(
          "Internet connection nahi hai. Please check your network 📡"
        );
        isNetworkToastShown = true;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
