import type { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, ListCollapse, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { confirmAPIForm } from "@/components/custom-alert";
import { getDetailsCourseApi } from "./useCourseAuthAction";
import { Badge } from "@/components/ui/badge";
import cookies_auth from "@/api/cookies-auth";
import type {
  CourseResponse,
  CourseResponseData,
  CourseResponseItem,
} from "../types/course-list.types";

export const fetchDataList = async (
  page: number,
  limit: number,
  search: string
): Promise<CourseResponseData> => {
  const { data } = await cookies_auth.get<CourseResponse>("/courses/admin", {
    params: {
      page,
      limit,
      search,
    },
  });
  return data.data;
};

export const deleteDataApi = async (id: string) => {
  const { data } = await cookies_auth.delete<CourseResponse>(`/courses/${id}`);
  return data.data;
};

export const useCourseAuthList = () => {
  const [openDetail, setOpenDetail] = useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    search: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: dataList,
    isLoading: isLoadingDataList,
    isError: isErrorDataList,
    error: errorDataList,
    refetch: refetchData,
  } = useQuery({
    queryKey: [
      "course-auth-list",
      pagination.page,
      pagination.limit,
      pagination.search,
    ],
    queryFn: () =>
      fetchDataList(pagination.page, pagination.limit, pagination.search),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (dataList?.meta) {
      setTotalPages(dataList.meta.totalPages);
    }
  }, [dataList]);

  const { data: dataDetail } = useQuery({
    queryKey: ["course-auth-list"],
    queryFn: () => getDetailsCourseApi(openDetail.id),
    refetchOnWindowFocus: false,
    enabled: openDetail.open,
  });

  const deleteData = useMutation({
    mutationFn: (id: string) => deleteDataApi(id),
    onSuccess: () => {
      refetchData();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const columns: ColumnDef<CourseResponseItem>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => (
        <div>{row.index + 1 + (pagination.page - 1) * pagination.limit}</div>
      ),
    },
    ...userscolumnsdata,
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }) => (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size={"icon"} variant={"outline"}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenDetail({
                        id: row.getValue("id"),
                        open: true,
                      });
                    }}
                  >
                    <ListCollapse />
                    <span>Detail</span>
                  </DropdownMenuItem>
                </>
                <Link to={`/admin/users/update/${row.getValue("id")}`}>
                  <DropdownMenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      const id: string = row.getValue("id");
                      confirmAPIForm({
                        callAPI: () => deleteData.mutate(id),
                        onAlertSuccess() {},
                        message: "Are you sure to delete this course?",
                        title: "Confirmation",
                      });
                    }}
                  >
                    <Trash2 />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return {
    dataList,
    isLoadingDataList,
    isErrorDataList,
    errorDataList,
    pagination,
    setPagination,
    totalPages,
    columns,
    dataDetail,
    setOpenDetail,
    openDetail,
  };
};

const userscolumnsdata: ColumnDef<CourseResponseItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "trainersCount",
    header: "Trainers Count",
  },
  {
    accessorKey: "participantsCount",
    header: "Participants Count",
  },
  {
    accessorKey: "modulesCount",
    header: "Module Count",
  },
  {
    accessorFn: (row) => row.createdBy?.username,
    id: "username",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    accessorFn: (row) => ({
      status: row.status,
      isPublic: row.isPublic,
    }),
    id: "status_public",
    header: "Status",

    cell: ({ row }) => {
      const value = row.getValue("status_public") as {
        status: number;
        isPublic: boolean;
      };

      return (
        <div className="flex flex-col gap-2">
          <Badge>
            {value.status == 0
              ? "Waiting Approval"
              : value.status == 1
              ? "Rejected"
              : "Approved"}
          </Badge>
          {value.isPublic ? (
            <Badge variant="default">Public</Badge>
          ) : (
            <Badge variant="destructive">Private</Badge>
          )}
        </div>
      );
    },
  },
];
