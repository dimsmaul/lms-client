// import { mdiLoading } from "@mdi/js";
// import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { ChevronDown, Cog } from "lucide-react";

export interface LoadersType {
  /**
   * @description This prop is used to specify the size of the icon to be displayed.
   * It accepts a number value that represents the size in pixels.
   * @default 1
   * @type {number}
   */
  size?: number;

  /**
   * @description This prop is used to apply additional CSS classes to the loader.
   * It allows for customization of the loader's appearance.
   * @default ""
   * @type {string}
   */
  className?: string;

  /**
   * @description This prop is used to specify whether the loader should be displayed in full screen mode.
   * It accepts a boolean value that determines if the loader should take up the entire screen.
   * @default false
   * @type {boolean}
   */
  isFullScreen?: boolean;
}

const Loaders: React.FC<LoadersType> = (props) => {
  return (
    // <div className="text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 opacity-80">

    // </div>
    <div
      className={clsx(
        "flex items-center justify-center",
        props.className,
        props.isFullScreen
          ? "fixed top-0 left-0 w-screen h-screen bg-primary-100 z-[9999]"
          : ""
      )}
    >
      <div className="flex flex-col gap-3 items-center">
        {/* Dots Loading */}
        <div className="flex space-x-5 justify-center items-center">
          <div className="h-2 w-2 bg-foreground rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-foreground rounded-full animate-bounce delay-150"></div>
          <div className="h-2 w-2 bg-foreground rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Normal Loading */}
        {/* <div className="inline-block h-20 w-20 animate-spin rounded-full border-2 border-solid border-foreground border-e-transparent"></div> */}
      </div>
      {/* <Icon path={mdiLoading} size={props.size || 2} className="animate-spin" /> */}
    </div>
  );
};

export default Loaders;
