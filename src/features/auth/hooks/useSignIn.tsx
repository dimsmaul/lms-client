import unauth from "@/api/unauth";
import { useAuthStore } from "@/hooks/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export interface SignInResponseType {
  id: string;
  name: string;
  email: string;
  role: string;
}

const loginUser = async (credentials: {
  identifier: string;
  password: string;
}) => {
  const { data } = await unauth.post("/auth/sign-in", credentials, {
    withCredentials: true, // penting biar cookie dikirim
  });
  return data.data;
};

export const useSignIn = () => {
  const { setUser } = useAuthStore();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      identifier: "dimsmaul",
      password: "1!Password",
    },
  });

  const handleSignIn = useMutation({
    mutationFn: (data: z.infer<typeof ValidationSchema>) =>
      loginUser({ identifier: data.identifier, password: data.password }),
    onSuccess: (res) => {
      // simpan user di Zustand (tanpa token)
      setUser(res?.user);
      nav("/");
    },
    onError: (error) => {
      form.setError("root", {
        message: "Invalid username or password",
        type: "manual",
      });
      console.error("Login failed:", error);
    },
  });

  return { handleSignIn, form };
};

export const ValidationSchema = z.object({
  identifier: z.string().min(3, { message: "Username or Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});
