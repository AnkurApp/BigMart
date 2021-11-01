import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";
import OrderCard from "../Components/orderCard";
import { getUserOrder } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "64px",
    padding: "2rem 3rem",
    backgroundColor: "#EAEDED",
    minHeight: "88.15vh",
    textAlign: "center",
  },

  orderContainer: {
    width: "75%",
    margin: "1.5rem auto 0",
  },

  emptyContainer: {
    paddingTop: "5rem",
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
});

export default function UserOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.products);

  useEffect(() => {
    if (auth.uid) {
      dispatch(getUserOrder(auth.uid));
    }
  }, [auth.uid]);

  return (
    <>
      <Navbar />
      <Box className={classes.mainContainer}>
        {orders.length > 0 ? (
          <>
            <Typography variant="h4">{"Your Orders"}</Typography>
            <Box className={classes.orderContainer}>
              {orders.map((data, index) => {
                return <OrderCard data={data} key={index} />;
              })}
            </Box>
          </>
        ) : (
          <Box className={classes.emptyContainer}>
            <Typography variant="h5">{"No Product Here"}</Typography>
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
      </Box>

      <Footer />
    </>
  );
}
