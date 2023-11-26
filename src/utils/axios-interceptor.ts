import axios from "axios";
import { useAuthStore } from "@/stores/AuthService";

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${auth.getToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
