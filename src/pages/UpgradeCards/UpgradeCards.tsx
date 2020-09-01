import React, { FC } from "react";
import { Container } from "../../components/Container/Container";
import { Renderer } from "../../components/Renderer/Renderer";

export const UpgradeCards: FC<{}> = () => {
  return (
    <div>
      <Container>
        Upgrade Cards <Renderer />
      </Container>
    </div>
  );
};
