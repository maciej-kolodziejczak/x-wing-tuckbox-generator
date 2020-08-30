import "./Navbar.css";

import React, { FC } from "react";
import { NavLink } from "react-router-dom";

export const Navbar: FC<{}> = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <NavLink className="list__item" to="/pilot-cards">
          Pilot Cards
        </NavLink>
        <NavLink className="list__item" to="/upgrade-cards">
          Upgrade Cards
        </NavLink>
      </ul>
    </nav>
  );
};
