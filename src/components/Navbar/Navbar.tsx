import "./Navbar.css";

import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";

export const Navbar: FC<{}> = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {routes.map(({ name, path }) => (
          <NavLink className="list__item" to={path} key={path}>
            {name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
