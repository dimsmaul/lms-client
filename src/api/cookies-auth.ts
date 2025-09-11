// import { callAlert } from "@/components/custom-alert";
import { useAuthStore } from "@/hooks/useAuthStore";
import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const cookies_auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Middleware utk isi ulang data user kalau store kosong
cookies_auth.interceptors.request.use(async (config) => {
  const { user, setUser } = useAuthStore.getState();

  // cek apakah user di store kosong tapi cookies masih valid
  if (!user?.id) {
    try {
      const { data } = await request.post("/auth/me", {
        withCredentials: true,
      });
      // console.log("Auto-fetch /auth/me:", data.user);
      // diasumsikan response { user, token }
      setUser(data.user);
    } catch (err) {
      console.warn("Auto-fetch /auth/me gagal:", err);
    }
  }

  return config;
});

cookies_auth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const { clearUser } = useAuthStore.getState();
    if (response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        // req refresh token
        await request.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        // if (!data) {
        //   clearUser();
        // }

        // retry original request (cookies sudah diperbarui otomatis)
        return cookies_auth(config);
      } catch (err) {
        clearUser()
        // callAlert({
        //   type: "error",
        //   title: "Session Expired",
        //   message: "Please log in again.",
        //   onConfirm: () => {
        //     window.location.href = "/";
        //   },
        // });
      }
    }

    return Promise.reject(error);
  }
);

export default cookies_auth;
