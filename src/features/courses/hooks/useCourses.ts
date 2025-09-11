
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { CourseListTypes } from "../types/course-list";
import cookies_auth from "@/api/cookies-auth";

const courseList = async (pagination: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
  type?: "my-participant" | "my-trainer" | "all-courses";
}) => {
  const { data } = await cookies_auth.get<CourseListTypes>("courses", {
    params: {
      ...pagination,
      limit: 12,
    },
  });
  return data.data;
};

export const useCourses = ({
  tabs,
}: {
  tabs?: "my-participant" | "my-trainer" | "all-courses";
}) => {
  const [search, setSearch] = useState({
    search: "",
  });
  const [paginate, setPaginate] = useState({
    total: 1,
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["courses", search, tabs],
    queryFn: ({ pageParam }) =>
      courseList({ page: pageParam, search: search.search, type: tabs }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.meta.limit;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data) {
      const dt = data?.pages.flatMap((page) => page.meta)[0];
      if (dt) {
        setPaginate({
          total: dt.total,
          page: dt.page,
          limit: dt.limit,
          totalPages: dt.totalPages,
        });
      }
    }
  }, [data]);

  return {
    data,
    paginate,
    setSearch,
    hasNextPage,
    fetchNextPage,
  };
};
