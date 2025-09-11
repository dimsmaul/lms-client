import cookies_auth from "@/api/cookies-auth";
import { confirmAPIForm } from "@/components/custom-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";
import { useOneCourse } from "./useOneCourse";
import type { CourseActionProps } from "../components/course-actions";

export interface useCourseActionProps extends CourseActionProps {}

export const useCourseAction = ({
  setIsOpen,
  isCreate,
}: useCourseActionProps) => {
  const { data: course } = useOneCourse();
  // automaticly get id when in page details
  const { id } = useParams();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      passingScore: "0",
      thumbnailUrl: "",
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title,
        description: course.description,
        passingScore: course.passingScore,
        thumbnailUrl: course.thumbnailUrl,
      });
    }
  }, [id, course]);

  const mutation = useMutation({
    mutationKey: ["courses"],
    mutationFn: (data: z.infer<typeof ValidationSchema>) =>
      saveCourse(id, {
        title: data.title,
        description: data.description,
        passingScore: data.passingScore,
        thumbnailUrl: data.thumbnailUrl,
      }),
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      setIsOpen(false);
      form.reset();
    },
    onError: (error) => {
      form.setError("root", {
        message: "Invalid course data",
        type: "manual",
      });
      console.log({ error });
    },
  });

  //   useEffect(() => {
  //     form.reset();
  //   }, [isOpen]);

  const handleSubmit = (value: z.infer<typeof ValidationSchema>) => {
    setIsOpen(false);
    confirmAPIForm({
      callAPI: () => mutation.mutateAsync(value),
      title: isCreate ? "Create Course" : "Edit Course",
      message: isCreate ? "Creating course..." : "Editing course...",
      onAlertSuccess: () => {},
      onCancel: () => {
        setIsOpen(true);
      },
    });
  };

  return {
    form,
    handleSubmit,
  };
};

const saveCourse = async (
  id: string | undefined,
  dt: {
    title: string;
    description: string;
    passingScore: string;
    thumbnailUrl: File | null;
  }
) => {
  const formdt = new FormData();
  formdt.append("title", dt.title);
  formdt.append("description", dt.description);
  formdt.append("passingScore", dt.passingScore);
  if (dt.thumbnailUrl) {
    formdt.append("thumbnailUrl", dt.thumbnailUrl);
  }

  if (id) {
    const { data } = await cookies_auth.patch(`courses/${id}`, formdt, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  } else {
    const { data } = await cookies_auth.post("courses", formdt, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  }
};

export const ValidationSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  passingScore: z
    .string()
    .min(1, { message: "Passing score must be at least 1" })
    .max(100, { message: "Passing score must be at most 100" }),
  thumbnailUrl: z.any().optional(),
  createdBy: z.any(),
});
