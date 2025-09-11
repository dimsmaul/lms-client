import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface NameCardProps {
  name?: string;
  imageUrl?: string;
}

const NameCard: React.FC<NameCardProps> = (props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar className="size-5">
        <AvatarImage src={props.imageUrl} />
        <AvatarFallback>{props.name ? props.name[0].toUpperCase() : "A"}</AvatarFallback>
      </Avatar>

      <h2 className="text-sm">{props.name ? props.name : "Admin"}</h2>
    </div>
  );
};

export default NameCard;
