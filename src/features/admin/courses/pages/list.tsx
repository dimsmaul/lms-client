import { DataTable } from "@/components/table";
import { useCourseAuthList } from "../hooks/useCourseAuthList";
import InputSearchDebounce from "@/components/input-search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const {
    dataList,
    pagination,
    setPagination,
    isLoadingDataList,
    totalPages,
    columns,
  } = useCourseAuthList();
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Course List</h1>
          <p className="text-sm text-gray-500">List of all courses</p>
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
          <Button onClick={() => navigate("/admin/courses/create")}>
            <Plus />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={dataList?.items ?? []}
        pageCount={totalPages}
        pagination={pagination}
        isLoading={isLoadingDataList}
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

export default CourseList;
