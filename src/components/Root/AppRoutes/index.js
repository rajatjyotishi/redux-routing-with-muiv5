/* eslint-disable */ // TODO: Should re-enable
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import CircleProgress from "@mui/material/CircularProgress";
import PrivateRoute from "./PrivateRoute";
import { loadTime } from "../../../appConstants";
import { routes } from "./routes";

const Admin = loadable(
  () => pMinDelay(import("../../../components/Admin"), loadTime),
  {
    fallback: <CircleProgress />,
  }
);

const AppRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={routes.HOME}
        render={() => (
          <Redirect
            to={{
              pathname: routes.ADMIN,
            }}
          />
        )}
      />
      <PrivateRoute
        exact
        path={routes.ADMIN}
        component={Admin}
        authenticated={true}
      />
    </Switch>
  );
};

export default AppRoutes;
