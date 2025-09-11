import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { CourseOneType, CourseOneTypeData } from "../types/course-one";
import cookies_auth from "@/api/cookies-auth";

const courseDetails = async (id: string): Promise<CourseOneTypeData> => {
  const { data } = await cookies_auth.get<CourseOneType>(`/courses/${id}`);
  return data.data;
};

export const useOneCourse = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["course", id],
    queryFn: () => courseDetails(id as string),
    enabled: !!id,
  });

  return { data };
};
