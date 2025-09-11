import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  type: "infinite-handle" | "button-handle";
  page: number;
  limit: number;
  totalPages: number;
  totalRecord: number;
};

type ListProps<T> = {
  data: T[];
  field?: (keyof T)[];
  type?: "card" | "list";
  pagination?: PaginationProps;
  handleNextPage?: () => void;
  renderItem?: (item: T, index: number) => React.ReactNode;
};

export function List<T>({
  data,
  field,
  type = "list",
  pagination,
  handleNextPage,
  renderItem,
}: ListProps<T>) {
  return (
    <div className={cn("w-full space-y-4")}>
      {/* Render Items */}
      <div
        className={cn(
          type === "card"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "flex flex-col divide-y"
        )}
      >
        {data.map((item, index) =>
          renderItem ? (
            renderItem(item, index)
          ) : (
            <div
              key={index}
              className={cn(
                type === "card"
                  ? "p-4 rounded-xl shadow bg-white"
                  : "py-2 px-3 hover:bg-muted/50 transition-all duration-150"
              )}
            >
              {field
                ? field.map((f, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{String(f)}:</span>{" "}
                      {String(item[f])}
                    </div>
                  ))
                : JSON.stringify(item)}
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      {pagination && handleNextPage && (
        <div className="flex justify-center mt-4">
          {pagination.type === "button-handle" &&
            pagination.page < pagination.totalPages && (
              <Button onClick={handleNextPage}>Load More</Button>
            )}

          {pagination.type === "infinite-handle" &&
            pagination.page < pagination.totalPages && (
              <div
                onClick={handleNextPage}
                className="cursor-pointer text-blue-500 text-sm hover:underline"
              >
                Scroll to load more...
              </div>
            )}
        </div>
      )}
    </div>
  );
}
