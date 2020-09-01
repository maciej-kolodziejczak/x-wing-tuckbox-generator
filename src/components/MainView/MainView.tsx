import React, { FC } from "react";
import { Route, Switch, Redirect } from "react-router";

import { routes } from "../../routes";

export const MainView: FC<{}> = () => {
  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route path={path} component={component} key={path}></Route>
      ))}
      <Redirect to="/pilot-cards" />
    </Switch>
  );
};
