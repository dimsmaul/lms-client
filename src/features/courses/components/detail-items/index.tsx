import { List } from "@/components/list";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import type { CourseOneTypeModule } from "../../types/course-one";
import { FileText, FilePlay, BookCheck, ListTodo, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DetailItemsProps = {
  modules: CourseOneTypeModule[];
  canEdit?: boolean;
};

export const DetailItems: React.FC<DetailItemsProps> = ({
  modules,
  canEdit,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <List
        data={modules || []}
        type="list"
        renderItem={(item, index) => (
          <Card key={index} className="p-4">
            <CardContent className="p-0">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue=""
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline items-center p-0">
                    <div>
                      <h1 className="text-xl font-bold ">
                        {item.title[0].toUpperCase()}
                        {item.title.slice(1)}
                      </h1>
                      <p>{item.content}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance mt-2">
                    <div>
                      <List
                        data={item.items || []}
                        renderItem={(mod, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex flex-row items-center justify-between p-3 hover:bg-primary/5 transition-all duration-100 cursor-pointer",
                              id === mod.id && "bg-primary/5 cursor-default"
                            )}
                            onClick={() => {
                              navigate("/courses/items/" + mod.id);
                            }}
                          >
                            <div className="flex flex-row items-center gap-3">
                              <div className="bg-primary/10 text-primary flex size-8 p-2 items-center justify-center rounded-md">
                                {renderItemIcon(mod.type)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">
                                  {mod.title}
                                </p>
                                <p className="text-xs">
                                  {mod.content.length > 100 ? (
                                    <>{mod.content.slice(0, 100)}...</>
                                  ) : (
                                    mod.content
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                    {canEdit && (
                      <Button
                        variant={"ghost"}
                        className="w-full border-dashed border"
                      >
                        <Plus />
                        Add Item
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}
      />
    </div>
  );
};

export default React.memo(DetailItems);

const renderItemIcon = (type?: "1" | "2" | "3" | "4") => {
  switch (type) {
    case "1":
      return <FileText className="size-6" />;
    case "2":
      return <FilePlay className="size-6" />;
    case "3":
      return <BookCheck className="size-6" />;
    case "4":
      return <ListTodo className="size-6" />;
    default:
      return null;
  }
};
