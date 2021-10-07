import {
  Box,
  Divider,
  makeStyles,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../Components/cartCard";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";
import { getCartProducts, numberFormat } from "../Redux/Actions/productActions";
import { useHistory } from "react-router";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "64px",
    backgroundColor: "#EAEDED",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    minHeight: "86.3vh",
  },

  cartItemsContainer: {
    width: "60%",
    backgroundColor: "#fff",
    padding: "1rem",
    marginRight: "2rem",
  },

  mainHeading: {
    letterSpacing: "1px",
    marginBottom: "1rem",
    fontSize: "27px",
  },

  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1.5rem",
  },

  span: {
    alignSelf: "flex-end",
    marginBottom: "10px",
  },

  rightContainer: {
    width: "22%",
  },

  totalPayCard: {
    width: "100%",
    margin: "2rem auto 0",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

  orderButton: {
    width: "80%",
    margin: "1rem auto 0",
    letterSpacing: "1px",

    "&:hover": {
      backgroundColor: "#C3073F",
      color: "#fff",
      fontWeight: "bold",
    },
  },

  emptyContainer: {
    marginTop: "64px",
    backgroundColor: "#EAEDED",
    padding: "5rem 2rem 2rem",
    minHeight: "86.3vh",
    width: "100%",
    textAlign: "center",
  },

  button: {
    margin: "2rem auto 0",
    letterSpacing: "1px",

    "&:hover": {
      backgroundColor: "#C3073F",
      color: "#fff",
      fontWeight: "bold",
    },
  },

  emptyCartIcon: {
    fontSize: "60px",
    margin: "1rem 0",
    color: "#C3073F",
  },
});
export default function UserCart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.products);
  const history = useHistory();

  useEffect(() => {
    if (auth.uid) {
      dispatch(getCartProducts(auth.uid));
    }
  }, [auth.uid]);

  let totalPay = 0;
  cart.map((data) => (totalPay = totalPay + parseInt(data.productPrice)));

  return (
    <>
      <Navbar />

      {cart.length > 0 ? (
        <Box className={classes.mainContainer}>
          <Box className={classes.cartItemsContainer}>
            <Box className={classes.flexBox}>
              <Typography className={classes.mainHeading}>
                {"Shopping Cart"}
              </Typography>
              <span className={classes.span}>{"Price"}</span>
            </Box>
            <Divider />
            {cart.map((data, index) => {
              return <CartCard data={data} key={index} />;
            })}
          </Box>

          <Box className={classes.rightContainer}>
            <Card className={classes.totalPayCard}>
              <Typography variant="h6">
                {`Total Amount (${cart.length} items): `}
                {`${numberFormat(totalPay)}`}
              </Typography>

              <Button
                variant="outlined"
                color="secondary"
                className={classes.orderButton}
                onClick={() => history.push("/BigMart/payment")}
              >
                {"Proceed to Buy"}
              </Button>
            </Card>
          </Box>
        </Box>
      ) : (
        <Box className={classes.emptyContainer}>
          <RemoveShoppingCartIcon className={classes.emptyCartIcon} />
          <Typography variant="h5">{"Your Cart is Empty"}</Typography>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => history.push("/BigMart")}
          >
            {"Go to Homepage"}
          </Button>
        </Box>
      )}

      <Footer />
    </>
  );
}
