import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    history.push(props.path);
  }, [props.path, history]);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated === "SUCCESS" || authenticated === "LOGGEDIN") {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}
