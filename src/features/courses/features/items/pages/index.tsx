import React from "react";
import { useItems } from "../hooks/useItems";
import DetailItems from "@/features/courses/components/detail-items";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PdfReader from "@/components/pdf-reader";

const CourseModuleItems: React.FC = () => {
  const { data } = useItems();
  return (
    <div className="grid grid-cols-4 gap-5">
      <div>
        <DetailItems modules={data?.module || []} />
      </div>
      <div className="col-span-3">
        <Card className="">
          <CardHeader>
            <CardTitle>{data?.title}</CardTitle>
            <CardDescription>{data?.content}</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.type === "1" ? (
              <PdfReader url={data?.sourceUrl || ""} />
            ) : (
              <>
                <video controls className="w-full">
                  <source src={data?.sourceUrl || ""} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseModuleItems;
