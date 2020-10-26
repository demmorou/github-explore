import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Routes: FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/repository" component={Repository} />
  </Switch>
);

export default Routes;
