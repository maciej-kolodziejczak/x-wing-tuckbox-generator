import React, { FC } from "react";

import { Content } from "../../components/Content/Content";
import { Container } from "../../components/Container/Container";

import { PilotFilters } from "./PilotFilters/PilotFilters";
import { PilotRenderer } from "./PilotRenderer/PilotRenderer";

import { PilotStateProvider } from "./PilotCards.context";

export const PilotCards: FC<{}> = () => {
  return (
    <div>
      <PilotStateProvider>
        <Container>
          <Content title="Pilot Cards">
            <PilotRenderer />
            <PilotFilters />
          </Content>
        </Container>
      </PilotStateProvider>
    </div>
  );
};
