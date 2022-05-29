import React from "react";
import { styled } from "@mui/material/styles";
import AppRoutes from "./AppRoutes";
import { Container } from "@mui/material";

const PREFIX = "Root";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    overflow: "auto",
    height: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

const AppRoot = () => {
  //   const { isRefreshingToken } = useAuthenticateUser(user);

  /**
   * This is to prevent displaying Login component while token
   * is refreshing, thus preventing screen flicker.
   */
  //   if (isRefreshingToken) {
  //     return (
  //       <div className="root-loading">
  //         <CircularProgress />
  //       </div>
  //     );
  //   }

  return (
    <Root className={classes.root}>
      <Container maxWidth={false}>
        <AppRoutes />
      </Container>
    </Root>
  );
};

export default AppRoot;
