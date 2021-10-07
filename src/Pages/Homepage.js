import { Box, Typography, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";
import SellCard from "../Components/sellproductCard";
import { getFavProducts, getProducts } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "64px",
    width: "100%",
    // backgroundColor: "#EAEDED",
  },

  adsContainer: {
    padding: "2rem",
  },

  categoryContainer: {
    margin: "1rem 0 2rem",
    // border: "1px solid black",
    backgroundColor: "#fff",
  },

  categoryName: {
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "20px",
  },

  carouselContainer: {
    "& .eRmJbc": {
      fontSize: "0.8rem",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
    "& .khvUfi": {
      fontSize: "0.8rem",
      boxShadow: "none",

      "&:hover:enabled": {
        backgroundColor: "#C3073F",
        boxShadow: "none",
      },
    },
  },

  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 2rem",
  },
});

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.uid) {
      dispatch(getFavProducts(auth.uid));
    }
  }, [auth.uid]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 850, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const { sellProducts } = useSelector((state) => state.products);

  return (
    <Box className={classes.mainContainer}>
      <Navbar />

      <Box className={classes.adsContainer}>
        {sellProducts.map((product, index) => {
          return (
            <Box className={classes.categoryContainer} key={index}>
              <Box className={classes.flexBox}>
                <Typography className={classes.categoryName}>
                  {Object.keys(product)[0]}
                </Typography>
                <Typography>{"View All"}</Typography>
              </Box>

              <Carousel
                className={classes.carouselContainer}
                breakPoints={breakPoints}
              >
                {product[Object.keys(product)[0]].map((ads, ind) => {
                  return <SellCard data={ads} key={ind} />;
                })}
              </Carousel>
            </Box>
          );
        })}
      </Box>

      <Footer />
    </Box>
  );
}
