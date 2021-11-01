import {
  Box,
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";

import {
  addToCart,
  getFavProducts,
  numberFormat,
  removeFromFav,
} from "../Redux/Actions/productActions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "64px",
    padding: "2rem 3rem",
    backgroundColor: "#EAEDED",
    minHeight: "88.15vh",
    textAlign: "center",
  },

  favContainer: {
    marginTop: "1.5rem",
    display: "grid",
    gridGap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },

  cardContainer: {
    height: "350px",
    padding: "1rem 1rem 0",
    borderLeft: "5px solid #C3073F",
    borderRight: "5px solid #C3073F",
    position: "relative",
  },

  productImage: {
    display: "block",
    height: "63%",
  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productData: {
    fontWeight: "bold",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  deleteIcon: {
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "40px",
    borderRadius: "50%",
    color: "#EAEDED",
  },

  btn: {
    padding: "0.1rem 0.3rem",
    marginTop: "0.5rem",
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

  heading: {
    textAlign: "center",
    fontSize: "30px",
    color: "#C3073F",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

export default function UserFavorite() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { favorite } = useSelector((state) => state.products);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (auth.uid) {
      dispatch(getFavProducts(auth.uid));
    }
  }, [auth.uid]);

  const handleDelete = (itemId) => {
    dispatch(removeFromFav(auth.uid, itemId));

    notify("Removed from Favorites");
  };

  const handleClick = (data) => {
    dispatch(addToCart(auth.uid, data));
    dispatch(removeFromFav(auth.uid, data.itemId));

    notify("Product Moved to Cart");
  };

  return (
    <>
      <Navbar />

      <Box className={classes.mainContainer}>
        {favorite.length > 0 ? (
          <>
            <Typography className={classes.heading}>
              {"Your Favorites"}
            </Typography>

            <Box className={classes.favContainer}>
              {favorite.map((data, index) => {
                return (
                  <Card
                    className={classes.cardContainer}
                    key={index}
                    onMouseOver={() => setShowButton(true)}
                    onMouseLeave={() => setShowButton(false)}
                  >
                    {showButton ? (
                      <HighlightOffIcon
                        className={classes.deleteIcon}
                        onClick={() => handleDelete(data.itemId)}
                      />
                    ) : (
                      ""
                    )}
                    <Link
                      to={{
                        pathname: `/BigMart/${data.productCategory}/${data.productTitle}`,
                        state: data,
                      }}
                    >
                      <CardMedia
                        className={classes.productImage}
                        component="img"
                        image={data.Image1}
                        alt={data.productTitle}
                      />
                    </Link>
                    <CardContent>
                      <Box className={classes.flexContainer}>
                        <Typography
                          className={classes.productData}
                          variant="h6"
                        >
                          {data.productTitle}
                        </Typography>
                        <Typography className={classes.productPrice}>
                          {numberFormat(data.productPrice)}
                        </Typography>
                      </Box>

                      <Box className={classes.flexContainer}>
                        <Typography>{data.userName}</Typography>
                        <Typography>{data.sellerCity}</Typography>
                      </Box>

                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        className={classes.btn}
                        onClick={() => handleClick(data)}
                      >
                        {"Move to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </>
        ) : (
          <Box className={classes.emptyContainer}>
            <Typography variant="h5">{"Your Favorite is Empty"}</Typography>
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
