import "./Container.css";
import React, { FC } from "react";

export const Container: FC<{}> = ({ children }) => {
  return <div className="container">{children}</div>;
};
