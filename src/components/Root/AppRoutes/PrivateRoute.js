import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "./routes";
import PropTypes from "prop-types";

/**
 * Will render provided component if user is authenticated, otherwise it will redirect user to login page
 */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.elementType,
  location: PropTypes.object,
};

export default PrivateRoute;
