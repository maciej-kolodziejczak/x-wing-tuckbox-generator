import "./Header.css";
import logo from "./logo.webp";

import React, { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Container } from "../Container/Container";

export const Header: FC<{}> = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__content">
          <div className="header__logo">
            <img className="logo__image" src={logo} alt="logo" />
            <p className="logo__tagline">Tuckbox Generator</p>
          </div>
          <div className="header__nav">
            <Navbar />
          </div>
        </div>
      </Container>
    </header>
  );
};
