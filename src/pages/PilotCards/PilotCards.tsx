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
            <div className="card-content">
              <div className="filters">
                <PilotFilters />
              </div>
              <div className="renderer">
                <PilotRenderer />
              </div>
            </div>
          </Content>
        </Container>
      </PilotStateProvider>
    </div>
  );
};
