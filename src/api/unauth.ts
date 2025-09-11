import axios from "axios";

const unauth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

unauth.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default unauth;
