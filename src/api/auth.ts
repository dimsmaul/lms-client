// import { callAlert } from "@/components/custom-alert";
// import { useAuthStore } from "@/hooks/useAuthStore";
// import axios from "axios";
// import unauth from "./unauth";

// const auth = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // penting kalau refresh token disimpan di httpOnly cookie
// });

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// auth.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().users.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   config.headers["Content-Type"] =
//     config.headers["Content-Type"] || "application/json";
//   return config;
// });

// auth.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // kalau access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return auth(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // call refresh endpoint
//         const res = await unauth.post(
//           "/auth/refresh",
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data?.accessToken;
//         if (newToken) {
//           useAuthStore.getState().setToken(newToken);

//           auth.defaults.headers.common["Authorization"] = "Bearer " + newToken;
//           processQueue(null, newToken);

//           return auth(originalRequest);
//         }
//       } catch (err) {
//         processQueue(err, null);
//         callAlert({
//           type: "error",
//           title: "Unauthorized",
//           message: "Your session has expired. Please log in again.",
//           onConfirm: () => {
//             useAuthStore.getState().clearUsers();
//             window.location.href = "/";
//           },
//         });
//       } finally {
//         isRefreshing = false;
//       }
//     } else {
//       const errorMessage = error.response?.data?.message || "An error occurred";
//       callAlert({
//         type: "error",
//         title: "Error",
//         message: errorMessage,
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// export default auth;
