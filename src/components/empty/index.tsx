import { Inbox } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

export interface EmptyProps {
  message?: string;
}

const Empty: React.FC<EmptyProps> = ({ message }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 justify-center items-center">
        <Inbox className="size-10" />
        <p>{message || "No content available"}</p>
      </CardContent>
    </Card>
  );
};

export default Empty;
