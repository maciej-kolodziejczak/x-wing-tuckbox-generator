import React, { FC } from "react";

import { Content } from "../../components/Content/Content";
import { Container } from "../../components/Container/Container";

import { UpgradeFilters } from "./UpgradeFilters/UpgradeFilters";
import { UpgradeRenderer } from "./UpgradeRenderer/UpgradeRenderer";

import { UpgradeStateProvider } from "./UpgradeCards.context";

export const UpgradeCards: FC<{}> = () => {
  return (
    <div>
      <UpgradeStateProvider>
        <Container>
          <Content title="Upgrade Cards">
            <UpgradeRenderer />
            <UpgradeFilters />
          </Content>
        </Container>
      </UpgradeStateProvider>
    </div>
  );
};
