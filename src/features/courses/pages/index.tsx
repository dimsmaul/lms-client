import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/hooks/useAuthStore";
import CourseList from "@/features/courses/components/course-list";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseAction from "../components/course-actions";

export interface CourseUserModuleProps {
  isMyCourses?: boolean;
}

const CoursesUserModule: React.FC<CourseUserModuleProps> = ({
  isMyCourses,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = React.useState<
    "my-participant" | "my-trainer" | "all-courses"
  >(
    isMyCourses
      ? user?.isAllowedToCreateCourse
        ? (searchParams.get("tab") as "my-participant" | "my-trainer") ||
          "my-participant"
        : "my-participant"
      : "all-courses"
  );
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {isMyCourses && user?.isAllowedToCreateCourse ? (
        <div className="flex justify-between items-start">
          <Tabs
            defaultValue={
              (searchParams.get("tab") as "my-participant" | "my-trainer") ||
              "my-participant"
            }
            className="w-[400px]"
            onValueChange={(value) => {
              setTab(value as "my-participant" | "my-trainer" | "all-courses");
              navigate(`?tab=${value}`);
            }}
          >
            <TabsList>
              <TabsTrigger value="my-participant">Participant</TabsTrigger>
              <TabsTrigger value="my-trainer">Trainer</TabsTrigger>
            </TabsList>
          </Tabs>
          {tab === "my-trainer" && (
            <Button size={"sm"} onClick={() => setIsOpen(true)}>
              <Plus />
              Create
            </Button>
          )}
        </div>
      ) : null}
      <CourseList tabs={tab} />
      <CourseAction isCreate isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CoursesUserModule;
