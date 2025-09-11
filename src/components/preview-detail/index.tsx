import { cn } from "@/lib/utils";
import React from "react";

export interface PreviewDetailsProps {
  label: string;
  labelClassName?: string;
  content: string | React.ReactNode;
  contentClassName?: string;
  className?: string;
}

const PreviewDetails = (props: PreviewDetailsProps) => {
  return (
    <div className={cn("flex flex-col gap-0", props.className)}>
      <h3 className={cn("text-sm", props.labelClassName)}>{props.label}</h3>
      <div className={cn("text-base ", props.contentClassName)}>
        {props.content}
      </div>
    </div>
  );
};

export default PreviewDetails;
