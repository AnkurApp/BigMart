import { Redirect, Route } from "react-router-dom";

export default function AuthRoutes(props) {
  const { token, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/BigMart"} />;
        }
      }}
    />
  );
}
