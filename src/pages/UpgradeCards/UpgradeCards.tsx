import React, { FC } from "react";
import { Container } from "../../components/Container/Container";
import { Renderer } from "../../components/Renderer/Renderer";
import { Renderer as RendererNew } from "../../components/Renderer/Renderer2";

export const UpgradeCards: FC<{}> = () => {
  return (
    <div>
      <Container>
        Upgrade Cards <Renderer /> <RendererNew />
      </Container>
    </div>
  );
};
