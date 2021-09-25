import { Box, Typography, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import Navbar from "../Components/Navbar";
import SellCard from "../Components/sellproductCard";
import { getProducts } from "../Redux/Actions/productActions";
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "70px",
    width: "100%",
  },

  adsContainer: {
    padding: "2rem",
  },

  categoryContainer: {
    margin: "1rem 0",
  },
});
export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
              <Typography className={classes.categoryName}>
                {Object.keys(product)[0]}
              </Typography>
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
    </Box>
  );
}
