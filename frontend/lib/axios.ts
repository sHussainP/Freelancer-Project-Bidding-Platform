import axios from "axios";

// Fallback automatically to localhost if your live Render URL environment variable is missing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Structural Interceptor Blueprint: To be hydrated when Token state management is connected
api.interceptors.request.use(
  (config) => {
    // If running in the browser, grab token safely from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
