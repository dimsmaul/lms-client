import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface PreviewImageProps {
  url: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ url }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Preview</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
          </DialogHeader>
          <img src={url} alt="" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewImage;
