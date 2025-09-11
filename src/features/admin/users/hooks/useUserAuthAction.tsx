import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { callAlert, confirmAPIForm } from "@/components/custom-alert";
import { useEffect } from "react";
import type { UserDetailsResponse } from "../types/user-detail.types";
import cookies_auth from "@/api/cookies-auth";

const actionUserApi = async (
  id: string | undefined,
  body: {
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password?: string;
    isActive?: boolean;
    isSuperAdmin?: boolean;
    isAllowedToCreateCourse?: boolean;
    profilePicture?: string | null;
  }
) => {
  const formdt = new FormData();
  formdt.append("firstName", body.firstName);
  formdt.append("lastName", body.lastName);
  if (body.username) {
    formdt.append("username", body.username);
  }
  formdt.append("email", body.email);
  // formdt.append("password", body.password ?? "");
  if (body.password) {
    formdt.append("password", body.password);
  }
  formdt.append("isActive", String(body.isActive));
  formdt.append("isSuperAdmin", String(body.isSuperAdmin));
  formdt.append(
    "isAllowedToCreateCourse",
    String(body.isAllowedToCreateCourse)
  );
  if (body.profilePicture) {
    formdt.append("profilePicture", body.profilePicture);
  }

  if (id) {
    const { data } = await cookies_auth.patch<UserDetailsResponse>(
      `/users/${id}`,
      formdt,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  } else {
    const { data } = await cookies_auth.post<UserDetailsResponse>(
      `/users`,
      formdt,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  }
};

export const getDetailsUsersApi = async (id: string) => {
  const { data } = await cookies_auth.get<UserDetailsResponse>(`/users/${id}`);
  return data.data;
};

export const useUserAuthAction = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const submitUser = useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      username?: string;
      email: string;
      password?: string;
      isActive?: boolean;
      isSuperAdmin?: boolean;
      isAllowedToCreateCourse?: boolean;
      profilePicture?: string | null;
    }) => actionUserApi(id, data),
    // }) => (id ? updateUsersApi({ ...data, id }) : createUsersApi(data)),
    onSuccess: () => {
      callAlert({
        type: "success",
        title: "Success!",
        message: "User action successfully",
        onConfirm(result) {
          if (result.isConfirmed) {
            nav("/admin/users");
          }
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmitUser = (data: {
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password?: string;
    isActive?: boolean;
    isSuperAdmin?: boolean;
    isAllowedToCreateCourse?: boolean;
    profilePicture?: string | null;
  }) => {
    const newdata = {
      ...data,
    };
    confirmAPIForm({
      type: "question",
      title: "Confirmation",
      callAPI: () => submitUser.mutate(newdata),
      onAlertSuccess: () => nav("/admin/users"),
    });
  };

  const form = useForm<z.infer<ReturnType<typeof getValidationSchema>>>({
    resolver: zodResolver(getValidationSchema(!!id)),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isActive: false,
      isAllowedToCreateCourse: false,
      isSuperAdmin: false,
      profilePicture: null,
    },
  });

  /**
   * @description
   * This function is used to set the default values of the form when the component is mounted.
   * It will fetch the user details from the API and set the values in the form.
   * It will only run when the component is mounted or when the `uname` changes.
   */
  const { setValue } = form;

  const { refetch: fetchUserDetails } = useQuery({
    queryKey: ["user-details", id],
    queryFn: () => getDetailsUsersApi(id as string),
    enabled: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (id) {
      fetchUserDetails().then((data) => {
        if (data) {
          const value = data?.data;
          setValue("firstName", value?.firstName ?? "");
          setValue("lastName", value?.lastName ?? "");
          setValue("username", value?.username ?? "");
          setValue("email", value?.email ?? "");
          setValue("isActive", value?.isActive ?? false);
          setValue(
            "isAllowedToCreateCourse",
            value?.isAllowedToCreateCourse ?? false
          );
          setValue("isSuperAdmin", value?.isSuperAdmin ?? false);
          setValue("profilePicture", value?.profilePicture ?? null);
        }
      });
    }
  }, [id, fetchUserDetails]);

  return {
    handleSubmitUser,
    form,
  };
};

const getValidationSchema = (isEdit: boolean) => {
  return z.object({
    // name: z.string().min(1, { message: "Name is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    username: z.string().optional(),
    email: z.string().min(1, { message: "Email is required" }),
    password: isEdit
      ? z.string().optional()
      : z.string().min(1, { message: "Password is required" }),
    isActive: z.boolean().optional(),
    isSuperAdmin: z.boolean().optional(),
    isAllowedToCreateCourse: z.boolean().optional(),
    profilePicture: z.any().optional(),
  });
};

// export const ValidationSchema =
