import { makeStyles, Box, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import SellCard from "../Components/sellproductCard";
import { getUserProduct } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  adsContainer: {
    marginTop: "100px",
  },
});

export default function UserAds() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getUserProduct(auth.uid));
  }, []);
  return (
    <Box>
      <Navbar />

      <Box className={classes.adsContainer}>
        <Typography>{"Your Ads"}</Typography>
        {products.map((product, index) => {
          return (
            <Box key={index}>
              <Typography>{Object.keys(product)[0]}</Typography>
              {product[Object.keys(product)[0]].map((ads, ind) => {
                return <SellCard data={ads} key={ind} />;
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
