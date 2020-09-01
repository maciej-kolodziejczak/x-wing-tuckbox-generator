import "./Content.css";
import React, { FC } from "react";
import { Ruler } from "../Ruler/Ruler";

interface ContentProps {
  title?: string;
}

export const Content: FC<ContentProps> = ({ children, title }) => {
  return (
    <div className="content">
      <div className="content__wrapper">
        <h2 className="content__title">{title}</h2>
        <Ruler orientation="horizontal" spacing="none" />
        <div className="content__inner">{children}</div>
      </div>
    </div>
  );
};
