import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Pages/initialScreen";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/Homepage";

import PrivateRoute from "../Components/PrivateRoute";

import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { userSession } from "../Redux/Actions/AuthActions";
import UserProfile from "../Pages/UserProfile";
import UserAds from "../Pages/UserAds";

export default function Ecommerce() {
  const getToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken) {
      dispatch(userSession());
    }
  }, [getToken, dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/Register" exact component={RegisterPage} />
        <Route path="/Login" exact component={LoginPage} />

        <PrivateRoute path="/BigMart" exact component={HomePage} />
        <PrivateRoute path="/BigMart/user" exact component={UserProfile} />
        <PrivateRoute path="/BigMart/ads" exact component={UserAds} />
      </Switch>
    </Router>
  );
}
