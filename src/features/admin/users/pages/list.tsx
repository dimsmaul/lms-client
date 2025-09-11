import { DataTable } from "@/components/table";
import { useUserAuthList } from "../hooks/useUserAuthList";
import InputSearchDebounce from "@/components/input-search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const {
    userList,
    pagination,
    setPagination,
    isLoadingUserList,
    totalPages,
    columns,
  } = useUserAuthList();
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">User List</h1>
          <p className="text-sm text-gray-500">List of all users</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <InputSearchDebounce
            defaultValue=""
            onChange={(e) =>
              setPagination((prev) => {
                return {
                  ...prev,
                  search: e,
                  page: 1,
                };
              })
            }
          />
          <Button onClick={() => navigate("/admin/users/create")}>
            <Plus />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={userList?.items ?? []}
        pageCount={totalPages}
        pagination={pagination}
        isLoading={isLoadingUserList}
        onPaginationChange={(page: number, limit: number) => {
          setPagination((prev) => {
            return {
              ...prev,
              page: page + 1,
              limit: limit,
            };
          });
        }}
      />
    </div>
  );
};

export default UserList;
