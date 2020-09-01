import React, { FC } from "react";
import { Ruler } from "../Ruler/Ruler";
import "./Footer.css";
import { Container } from "../Container/Container";

export const Footer: FC<{}> = () => {
  return (
    <div className="footer">
      <Container>
        <Ruler orientation="horizontal" spacing="top" />
        <div className="footer__disclaimer">
          This is an open source project that uses very similar design with{" "}
          <a
            href="https://squadbuilder.fantasyflightgames.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Squad Builder
          </a>{" "}
          just to provide some immersion. There are no affiliations with{" "}
          <a
            href="https://www.fantasyflightgames.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FFG
          </a>{" "}
          or any other related company.
        </div>
      </Container>
    </div>
  );
};
