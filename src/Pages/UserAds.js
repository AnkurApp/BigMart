import { makeStyles, Box, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
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

  // console.log(products, "pro");
  // products && console.log(Object.values(products), "val");

  // let category = [];
  // if (products) {
  //   category = Object.keys(products);
  // }

  // console.log(category);

  useEffect(() => {
    dispatch(getUserProduct(auth.uid));
  }, []);
  return (
    <Box>
      <Navbar />

      <Box className={classes.adsContainer}>
        <Typography>{"Your Ads"}</Typography>
        {/* {products &&
         
          })} */}
      </Box>
    </Box>
  );
}
