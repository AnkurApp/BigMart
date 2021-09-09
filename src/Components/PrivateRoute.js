import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  console.log(props, "props");
  const { authenticated } = useSelector((state) => state.auth);

  console.log(authenticated, "prA");

  const history = useHistory();
  useEffect(() => {
    if (authenticated === "SUCCESS" || authenticated === "LOGGEDIN") {
      history.push(props.path);
    }
  }, [history, authenticated, props.path]);
  return (
    <Route
      {...rest}
      component={(props) => {
        if (authenticated === "SUCCESS" || authenticated === "LOGGEDIN") {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}
