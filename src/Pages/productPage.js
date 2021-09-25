import { makeStyles, Box, Typography, Card, Avatar } from "@material-ui/core";
import { useLocation, useParams } from "react-router";
import Navbar from "../Components/Navbar";
import SimpleImageSlider from "react-simple-image-slider";

import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  productContainer: {
    marginTop: "64px",
    padding: "2rem",
    display: "flex",
    backgroundColor: "grey",
  },

  detailsContainer: {
    margin: "1rem 2rem",
  },

  productCard: {
    padding: "1rem",
  },

  flexBox: {
    display: "flex",
  },
});

export default function ProductPage() {
  const classes = useStyles();
  const { category, product } = useParams();

  const [sellerImage, setsellerImage] = useState(null);

  const location = useLocation();
  const productData = location.state;

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

  return (
    <>
      <Navbar />
      <Box className={classes.productContainer}>
        <SimpleImageSlider
          width={800}
          height={500}
          slideDuration={0.3}
          showBullets={true}
          showNavs={true}
          navSize={30}
          navStyle={2}
          images={imageArray}
        />

        <Box className={classes.detailsContainer}>
          <Card className={classes.productCard}>
            <Typography variant="h6">{`Rs: ${productData.productPrice}`}</Typography>
            <Typography variant="h6">{productData.productTitle}</Typography>
            <Typography>{productData.productDesc}</Typography>
          </Card>

          <Card className={classes.sellerCard}>
            <Box className={classes.flexBox}>
              {sellerImage ? (
                <Avatar src={sellerImage} />
              ) : (
                <Avatar {...stringAvatar(`${productData.userName}`)} />
              )}
              <Typography>{productData.userName}</Typography>
            </Box>

            <Box className={classes.flexBox}>
              <Typography>{productData.phoneNo}</Typography>
              <Typography>{productData.sellerCity}</Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
