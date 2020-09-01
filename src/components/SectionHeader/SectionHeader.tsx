import "./SectionHeader.css";
import React, { FC } from "react";

import { Ruler } from "../Ruler/Ruler";

export const SectionHeader: FC<{}> = ({ children }) => {
  return (
    <div className="section-header">
      <div className="section-header__content">{children}</div>
      <Ruler orientation="horizontal" spacing="none" dimmed />
    </div>
  );
};
