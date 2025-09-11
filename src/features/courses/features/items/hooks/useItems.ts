import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import type { CourseOneType, CourseOneTypeData } from "../types/course-one";
import cookies_auth from "@/api/cookies-auth";
import type { ModuleItemsType, ModuleItemsTypeData } from "../types/detail";

const moduleItems = async (id: string): Promise<ModuleItemsTypeData> => {
  const { data } = await cookies_auth.get<ModuleItemsType>(
    `/module-items/${id}`
  );
  return data.data;
};

export const useItems = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["module-items", id],
    queryFn: () => moduleItems(id as string),
  });

  return { data };
};
