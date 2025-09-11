// import { secretStorage } from "@/utils/secret-storage";
// import { create } from "zustand";

// export interface UserTypes {
//   token: string;
//   user: UserDataTypes;
// }

// export interface UserDataTypes {
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   profile: string;
//   isSuperAdmin: boolean;
//   isAllowedToCreateCourse: boolean;
// }

// interface AuthState {
//   /**
//    * @Types {UserTypes}
//    * @description User data
//    * @default { id: "", name: "", email: "" }
//    */
//   users: UserTypes;

//   /**
//    * @description Set user data
//    * @param {UserTypes} users
//    */
//   setUsers: (users: UserTypes) => void;

//   /**
//    * @description Clear user data
//    */
//   clearUsers: () => void;

//   /**
//    * @description Set token data
//    * @param {string} token
//    */
//   setToken: (token: string) => void;

//   /**
//    * @description Clear token data
//    */
//   clearToken: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       users: {
//         token: "",
//         user: {
//           id: "",
//           firstName: "",
//           lastName: "",
//           username: "",
//           email: "",
//           profile: "",
//           isSuperAdmin: false,
//           isAllowedToCreateCourse: false,
//         },
//       },
//       setUsers: (users) => set({ users }),
//       clearUsers: () =>
//         set({
//           users: {
//             token: "",
//             user: {
//               id: "",
//               firstName: "",
//               lastName: "",

//               username: "",
//               email: "",
//               profile: "",
//               isSuperAdmin: false,
//               isAllowedToCreateCourse: false,
//             },
//           },
//         }),

//       setToken: (token) =>
//         set((state) => ({ users: { ...state.users, token } })),
//       clearToken: () =>
//         set((state) => ({ users: { ...state.users, token: "" } })),
//     }),
// {
//   name: "auth-storage", // Nama key di localStorage
//   storage: createJSONStorage(() => secretStorage),
// }
//   )
// );

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import cookies_auth, { request } from "@/api/cookies-auth";
import { secretStorage } from "@/utils/secret-storage";

export interface UserDataTypes {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profile: string;
  isSuperAdmin: boolean;
  isAllowedToCreateCourse: boolean;
}

interface AuthState {
  user: UserDataTypes | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: UserDataTypes) => void;
  clearUser: () => void;
  logOut: () => void;
  refetchSessionAt: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      refetchSessionAt: Date.now() + 1000 * 60 * 60, // 1 hour
      checkAuth: async () => {
        try {
          const res = await request.post("/auth/me");
          set({
            user: res.data,
            loading: false,
            refetchSessionAt: Date.now() + 1000 * 60 * 60, // 1 hour
          });
        } catch {
          set({ user: null, loading: false });
        }
      },

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      logOut: async () => {
        try {
          await cookies_auth.post("/auth/logout");
          set({ user: null });
        } catch (error) {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // Nama key di localStorage
      storage: createJSONStorage(() => secretStorage),
    }
  )
);
