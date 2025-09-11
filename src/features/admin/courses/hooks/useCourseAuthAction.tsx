import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { callAlert, confirmAPIForm } from "@/components/custom-alert";
import { useEffect } from "react";
import type { CourseDetailsResponse } from "../types/course-detail.types";
import cookies_auth from "@/api/cookies-auth";

const actionCourseApi = async (
  id: string | undefined,
  body: {
    title: string;
    description: string;
    passingScore: number;
    trainerIds?: string;
    participantIds?: string;
    isPublic: boolean;
    thumbnailUrl?: string;
  }
) => {
  const formdt = new FormData();
  formdt.append("title", body.title);
  formdt.append("description", body.description);
  formdt.append("passingScore", String(body.passingScore));
  if (body.trainerIds) {
    formdt.append("trainerIds", body.trainerIds);
  }
  if (body.participantIds) {
    formdt.append("participantIds", body.participantIds);
  }
  formdt.append("isPublic", String(body.isPublic));
  if (body.thumbnailUrl) {
    formdt.append("thumbnailUrl", body.thumbnailUrl);
  }

  if (id) {
    const { data } = await cookies_auth.patch<CourseDetailsResponse>(
      `/courses/${id}`,
      formdt,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  } else {
    const { data } = await cookies_auth.post<CourseDetailsResponse>(
      `/courses`,
      formdt,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  }
};

export const getDetailsCourseApi = async (id: string) => {
  const { data } = await cookies_auth.get<CourseDetailsResponse>(
    `/users/${id}`
  );
  return data.data;
};

export const useUserAuthAction = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const submitUser = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      passingScore: number;
      trainerIds?: string;
      participantIds?: string;
      isPublic: boolean;
      thumbnailUrl?: string;
    }) => actionCourseApi(id, data),
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
    title: string;
    description: string;
    passingScore: number;
    trainerIds?: string;
    participantIds?: string;
    isPublic: boolean;
    thumbnailUrl?: string;
  }) => {
    const newdata = {
      ...data,
    };
    confirmAPIForm({
      type: "question",
      title: "Confirmation",
      callAPI: () => submitUser.mutate(newdata),
      onAlertSuccess: () => nav("/admin/courses"),
    });
  };

  const form = useForm<z.infer<ReturnType<typeof getValidationSchema>>>({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: {
      title: "",
      description: "",
      passingScore: "",
      trainerIds: "",
      participantIds: "",
      isPublic: false,
      thumbnailUrl: null,
    },
  });

  /**
   * @description
   * This function is used to set the default values of the form when the component is mounted.
   * It will fetch the user details from the API and set the values in the form.
   * It will only run when the component is mounted or when the `uname` changes.
   */
  const { setValue } = form;

  const { refetch: fetchDataDetails } = useQuery({
    queryKey: ["user-details", id],
    queryFn: () => getDetailsCourseApi(id as string),
    enabled: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (id) {
      fetchDataDetails().then((data) => {
        if (data) {
          const value = data?.data;
          setValue("title", value?.title ?? "");
          setValue("description", value?.description ?? "");
          setValue("passingScore", value?.passingScore ?? "0");
          setValue(
            "trainerIds",
            value?.trainers?.map((item) => item.id).join(",") ?? ""
          );
          setValue(
            "participantIds",
            value?.participants?.map((item) => item.user.id).join(",") ?? ""
          );
          setValue("isPublic", value?.isPublic ?? false);
          setValue("thumbnailUrl", value?.thumbnailUrl ?? null);
        }
      });
    }
  }, [id, fetchDataDetails]);

  return {
    handleSubmitUser,
    form,
  };
};

const getValidationSchema = () => {
  return z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    passingScore: z.string().optional(),
    trainerIds: z.string().optional(),
    participantIds: z.string().optional(),
    isPublic: z.boolean().optional(),
    thumbnailUrl: z.any().optional(),
  });
};

// export const ValidationSchema =
