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
import { getDetailsUsersApi } from "./useUserAuthAction";
import { Badge } from "@/components/ui/badge";
import cookies_auth from "@/api/cookies-auth";
import type {
  UserResponse,
  UserResponseData,
  UserResponseItem,
} from "../types/users-list.types";

export const fetchUserList = async (
  page: number,
  limit: number,
  search: string
): Promise<UserResponseData> => {
  const { data } = await cookies_auth.get<UserResponse>("/users", {
    params: {
      page,
      limit,
      search,
    },
  });
  return data.data;
};

export const deleteUserApi = async (username: string) => {
  const { data } = await cookies_auth.delete<UserResponse>(`/users/${username}`);
  return data.data;
};

export const useUserAuthList = () => {
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
    data: userList,
    isLoading: isLoadingUserList,
    isError: isErrorUserList,
    error: errorUserList,
    refetch: refeUser,
  } = useQuery({
    queryKey: [
      "user-auth-list",
      pagination.page,
      pagination.limit,
      pagination.search,
    ],
    queryFn: () =>
      fetchUserList(pagination.page, pagination.limit, pagination.search),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userList?.meta) {
      setTotalPages(userList.meta.totalPages);
    }
  }, [userList]);

  const { data: userDetail } = useQuery({
    queryKey: ["user-auth-list"],
    queryFn: () => getDetailsUsersApi(openDetail.id),
    refetchOnWindowFocus: false,
    enabled: openDetail.open,
  });

  const deleteUser = useMutation({
    mutationFn: (username: string) => deleteUserApi(username),
    onSuccess: () => {
      refeUser();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const columns: ColumnDef<UserResponseItem>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => (
        <div>{row.index + 1 + (pagination.page - 1) * pagination.limit}</div>
      ),
    },
    ...userscolumnsdata,
    {
      accessorKey: "lastName",
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
                <Link to={`/admin/users/update/${row.getValue("username")}`}>
                  <DropdownMenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      const username: string = row.getValue("username");
                      confirmAPIForm({
                        callAPI: () => deleteUser.mutate(username),
                        onAlertSuccess() {},
                        message: "Are you sure to delete this user?",
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
    userList,
    isLoadingUserList,
    isErrorUserList,
    errorUserList,
    pagination,
    setPagination,
    totalPages,
    columns,
    userDetail,
    setOpenDetail,
    openDetail,
  };
};

const userscolumnsdata: ColumnDef<UserResponseItem>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("firstName")} {row.getValue("lastName")}
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("isActive") ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant={"destructive"}>Inactive</Badge>
        )}
      </div>
    ),
  },
];
