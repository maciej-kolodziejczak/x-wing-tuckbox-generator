import React, { FC } from "react";
import { Route, Switch, Redirect } from "react-router";

import { PilotCards } from "../../Pages/PilotCards/PilotCards";
import { UpgradeCards } from "../../Pages/UpgradeCards/UpgradeCards";

export const MainView: FC<{}> = () => {
  return (
    <Switch>
      <Route path="/pilot-cards" component={PilotCards} exact />
      <Route path="/upgrade-cards" component={UpgradeCards} exact />
      <Redirect to="/pilot-cards" />
    </Switch>
  );
};
