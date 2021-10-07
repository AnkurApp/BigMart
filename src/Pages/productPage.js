import {
  makeStyles,
  Box,
  Typography,
  Card,
  Avatar,
  Button,
} from "@material-ui/core";
import { useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import SimpleImageSlider from "react-simple-image-slider";

import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite, numberFormat } from "../Redux/Actions/productActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";

const useStyles = makeStyles({
  productContainer: {
    marginTop: "64px",
    padding: "2rem 10rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#EAEDED",
  },

  detailsContainer: {
    width: "35%",
    padding: "2rem",
  },

  productCard: {
    width: "100%",
    padding: "1rem",
    marginBottom: "2rem",
  },

  flexBox: {
    display: "flex",
    alignItems: "center",
  },

  sellerCard: {
    width: "100%",
    padding: "1rem",
  },

  avatar: {
    display: "block",
    width: "50px",
    height: "50px",
  },

  userName: {
    fontSize: "20px",
    marginLeft: "1.5rem",
  },

  userDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: ".5rem",
  },

  btnGroup: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  btn: {
    letterSpacing: "1px",

    "&:hover": {
      backgroundColor: "#C3073F",
      color: "#fff",
      border: "none",
    },
  },
});

export default function ProductPage() {
  const classes = useStyles();
  const [sellerImage, setsellerImage] = useState(null);
  const location = useLocation();
  const productData = location.state;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const imageArray = [
    { url: productData.Image1 },
    { url: productData.Image2 },
    { url: productData.Image3 },
  ];

  useEffect(() => {
    getUser(productData.useruid);
  }, []);

  const getUser = (uid) => {
    const dbRef = ref(database, `Users/${uid}`);
    onValue(dbRef, (snapshot) => {
      const userData = snapshot.val();
      userData.photoURL && setsellerImage(userData.photoURL);
    });
  };

  const stringAvatar = (sellerName) => {
    return {
      children: `${sellerName.split(" ")[0][0]}${sellerName.split(" ")[1][0]}`,
    };
  };

  const addFavorite = () => {
    dispatch(addToFavorite(auth.uid, productData));
    notify("Added to Favorites");
  };

  const addCart = () => {
    dispatch(addToCart(auth.uid, productData));
    notify("Product Added to Cart");
  };

  return (
    <>
      <Navbar />
      <Box className={classes.productContainer}>
        <SimpleImageSlider
          width={900}
          height={550}
          slideDuration={0.3}
          showBullets={true}
          showNavs={true}
          navSize={30}
          navStyle={2}
          images={imageArray}
        />

        <Box className={classes.detailsContainer}>
          <Card className={classes.productCard}>
            <Typography variant="h6">
            {numberFormat(productData.productPrice)}
            </Typography>
            <Typography variant="h6">{productData.productTitle}</Typography>
            <Typography>{productData.productDesc}</Typography>
          </Card>

          <Card className={classes.sellerCard}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              {"Seller Description"}
            </Typography>
            <Box className={classes.flexBox}>
              {sellerImage ? (
                <Avatar src={sellerImage} className={classes.avatar} />
              ) : (
                <Avatar {...stringAvatar(`${productData.userName}`)} />
              )}
              <Typography className={classes.userName}>
                {productData.userName}
              </Typography>
            </Box>

            <Box className={classes.userDetails}>
              <Typography>{productData.phoneNo}</Typography>
              <Typography>{productData.sellerCity}</Typography>
            </Box>
          </Card>

          <Box className={classes.btnGroup}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.btn}
              onClick={addFavorite}
            >
              {"Add to Favorites"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.btn}
              onClick={addCart}
            >
              {"Add to Cart"}
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
