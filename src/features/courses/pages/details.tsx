import React from "react";
import { useOneCourse } from "../hooks/useOneCourse";
import DetailItems from "../components/detail-items";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import CourseAction from "../components/course-actions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PreviewDetails from "@/components/preview-detail";
import NameCard from "@/components/namecard";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DetailCoursesUserModuleProps {
  isTrainer?: boolean;
}

const DetailCoursesUserModule: React.FC<DetailCoursesUserModuleProps> = (
  props
) => {
  const { data } = useOneCourse();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-10">
        {/* Thumbnail */}
        <div className="relative w-full h-80">
          {/* Gambar */}
          <img
            src={data?.thumbnailUrl}
            alt={data?.title}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Overlay gradasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-xl" />

          {/* Teks di atas gradasi */}
          <div className="absolute bottom-2 left-2 text-white text-sm font-bold p-6">
            <h1 className="font-bold text-2xl">{data?.title}</h1>
          </div>
          {props.isTrainer && (
            <div className="absolute bottom-2 right-2 text-white text-sm font-bold p-6">
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => setIsOpen(true)}
              >
                <Edit />
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3 flex flex-col gap-5">
            <DetailItems
              modules={data?.modules || []}
              canEdit={props.isTrainer && data?.status == 2}
            />
            {props.isTrainer && data?.status == 2 && (
              <Button variant={"ghost"} className="w-full border border-dashed">
                <Plus />
                Add Module
              </Button>
            )}
          </div>
          <div>
            <Card>
              <CardContent>
                <CardTitle>Course Details</CardTitle>
                <div className="flex flex-col gap-4 mt-4">
                  <PreviewDetails
                    label={"Created At"}
                    content={dayjs(data?.createdAt).format("MMMM DD, YYYY")}
                  />
                  <PreviewDetails
                    label={"Status"}
                    content={
                      <Badge
                        className={cn(
                          data?.status == 0 && "bg-yellow-500",
                          data?.status == 1 && "bg-red-500",
                          data?.status == 2 && "bg-green-500"
                        )}
                      >
                        {data?.status == 0
                          ? "Waiting Approval"
                          : data?.status == 1
                          ? "Rejected"
                          : "Approved"}
                      </Badge>
                    }
                  />
                  <PreviewDetails
                    label={"Created By"}
                    content={
                      <NameCard
                        name={data?.createdBy?.firstName}
                        imageUrl={data?.createdBy?.profilePicture}
                      />
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Course Create */}
      <CourseAction isCreate={false} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DetailCoursesUserModule;
