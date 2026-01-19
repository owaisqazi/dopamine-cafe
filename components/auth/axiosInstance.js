import axios from "axios";
//@ts-ignore
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const API_BASE_URL = "https://practice.devssh.xyz/api";
export const IMAGE_BASE_URL = "https://practice.devssh.xyz/storage/";

let isNetworkToastShown = false; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

// ✅ Request Interceptor
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

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Agar request success ho gayi, toh network guard reset kar dein
    isNetworkToastShown = false;
    return response;
  },
  (error) => {
    // 1. Agar Internet bilkul nahi hai (Network Error)
    if (error.code === "ERR_NETWORK") {
      if (!isNetworkToastShown) {
        toast.error("No Internet Connection. Please check your network 📡");
        isNetworkToastShown = true;
      }
    } 
    // 2. Agar Server ne response diya (e.g., 401 Unauthorized, 404, 500)
    else if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        // Token expire ho gaya ho toh logout logic yahan daal sakte hain
        toast.error("Session expire ho gaya hai, please login karein.");
      } else if (status >= 500) {
        toast.error("Server mein kuch kharabi hai 🛠️");
      }
      
      // Response aane par network toast guard reset kar sakte hain
      isNetworkToastShown = false;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;