import { makeStyles, Box, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdsCard from "../Components/adsCard";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";
import { getUserProduct } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  adsContainer: {
    marginTop: "64px",
    padding: "1rem 2rem",
    minHeight: "88.15vh",
    backgroundColor: "#EAEDED",
  },

  productBox: {
    display: "grid",
    gridGap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },

  heading: {
    textAlign: "center",
    fontSize: "30px",
    color: "#C3073F",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
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
    <Box className={classes.mainContainer}>
      <Navbar />

      <Box className={classes.adsContainer}>
        <Typography className={classes.heading}>{"Your Ads"}</Typography>
        <Box className={classes.productBox}>
          {products.map((product, index) => {
            return (
              <Box key={index}>
                {product[Object.keys(product)[0]].map((ads, ind) => {
                  return <AdsCard data={ads} key={ind} />;
                })}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
