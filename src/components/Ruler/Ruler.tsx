import "./Ruler.css";
import React, { FC } from "react";

interface RulerProps {
  orientation: "horizontal" | "vertical";
  spacing: "both" | "top" | "bottom" | "none";
}

const classNameMap = {
  horizontal: "ruler-x",
  vertical: "ruler-y",
  both: "ruler-t ruler-b",
  top: "ruler-t",
  bottom: "ruler-b",
  none: "",
};

export const Ruler: FC<RulerProps> = ({ orientation, spacing }) => {
  return (
    <div
      className={`
        ruler
        ${classNameMap[orientation]}
        ${classNameMap[spacing]}
    `}
    ></div>
  );
};
