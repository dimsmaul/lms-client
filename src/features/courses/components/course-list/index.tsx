import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import NameCard from "@/components/namecard";
import { useCourses } from "../../hooks/useCourses";
import { useNavigate } from "react-router-dom";
import { List } from "@/components/list";
import Empty from "@/components/empty";

export interface CourseListProps {
  tabs?: "my-participant" | "my-trainer" | "all-courses";
}

const CourseList: React.FC<CourseListProps> = ({ tabs }) => {
  const { data, hasNextPage, fetchNextPage, paginate } = useCourses({ tabs });
  const navigate = useNavigate();
  const list = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="">
      {list.length === 0 ? (
        <Empty />
      ) : (
        <List
          data={list}
          type="card"
          pagination={{
            type: "infinite-handle",
            limit: paginate.limit,
            page: paginate.page,
            totalPages: paginate.totalPages,
            totalRecord: paginate.total,
          }}
          handleNextPage={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          renderItem={(item, index) => (
            <Card
              key={index}
              className="p-4"
              onClick={() => {
                if (tabs === "my-trainer")
                  navigate("/courses/" + item.id + "/edit");
                else navigate("/courses/" + item.id);
              }}
            >
              <img
                src={item.thumbnailUrl}
                alt="Image"
                className="rounded-sm object-cover h-48 w-full"
              />
              <div>
                <CardHeader className="p-0">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2 h-10">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between text-sm">
                    <p>Progress</p>

                    <p>10%</p>
                  </div>
                  <Progress value={10} />

                  <div>
                    <NameCard
                      imageUrl={item.createdBy?.profilePicture}
                      name={item.createdBy?.firstName}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default CourseList;
