import "./PageContainer.css";
import React, { FC } from "react";

export const PageContainer: FC<{}> = ({ children }) => {
  return <div className="page-container">{children}</div>;
};
