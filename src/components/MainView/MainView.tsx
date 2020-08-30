import React, { FC } from "react";
import { Route, Switch, Redirect } from "react-router";

import { routes } from "../../routes";

export const MainView: FC<{}> = () => {
  return (
    <Switch>
      {routes.map(({ path, name, component }) => (
        <Route path={path} component={component}>
          {name}
        </Route>
      ))}
      <Redirect to="/pilot-cards" />
    </Switch>
  );
};
