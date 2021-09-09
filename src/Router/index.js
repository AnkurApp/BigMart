import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "../Pages/initialScreen";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/Homepage";

import PrivateRoute from "../Components/PrivateRoute";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { userSession } from "../Redux/Actions/AuthActions";

export default function Ecommerce() {
  const { authenticated } = useSelector((state) => state.auth);
  const getToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken && !authenticated) {
      console.log("faltu2");
      dispatch(userSession());
    }
  }, [getToken, dispatch, authenticated]);
  return (
    <Router>
      <Route path="/" exact component={LandingPage} />
      <Route path="/Register" exact component={RegisterPage} />
      <Route path="/Login" exact component={LoginPage} />

      <PrivateRoute path="/BigMart" exact component={HomePage} />
    </Router>
  );
}
