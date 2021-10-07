import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Pages/initialScreen";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/Homepage";

import PrivateRoute from "./PrivateRoute";

import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { userSession } from "../Redux/Actions/AuthActions";
import UserProfile from "../Pages/UserProfile";
import UserAds from "../Pages/UserAds";
import ProductPage from "../Pages/productPage";
import AuthRoutes from "./authRoutes";
import UserCart from "../Pages/CartPage";
import UserFavorite from "../Pages/FavPage";
import StripeContainer from "../Components/StripeContainer";
import UserOrder from "../Pages/OrderPage";

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
        <AuthRoutes token={getToken} path="/" exact component={LandingPage} />
        <AuthRoutes
          token={getToken}
          path="/Register"
          exact
          component={RegisterPage}
        />
        <AuthRoutes
          token={getToken}
          path="/Login"
          exact
          component={LoginPage}
        />

        <PrivateRoute path="/BigMart" exact component={HomePage} />
        <PrivateRoute path="/BigMart/user" exact component={UserProfile} />
        <PrivateRoute path="/BigMart/ads" exact component={UserAds} />
        <Route
          path="/BigMart/:category/:product"
          exact
          component={ProductPage}
        />
        <Route path="/BigMart/Cart" exact component={UserCart} />
        <Route path="/BigMart/Order" exact component={UserOrder} />
        <Route path="/BigMart/Favorite" exact component={UserFavorite} />
        <Route path="/BigMart/payment" exact component={StripeContainer} />
      </Switch>
    </Router>
  );
}
