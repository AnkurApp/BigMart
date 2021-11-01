import {
  Card,
  Box,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addToFavorite,
  numberFormat,
  removeFromFav,
} from "../Redux/Actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  cardContainer: {
    width: "320px",
    height: "300px",
  },

  productImage: {
    display: "block",
    height: "65%",
    backgroundSize: "contain",
  },

  cardContent: {
    height: "35%",
    padding: "0.5rem 1rem",
    borderBottom: "3px solid #C3073F",

  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productData: {
    color: "#C3073F",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  productPrice: {
    fontWeight: "bold",
  },

  favoriteIcon: {
    cursor: "pointer",
  },

  favRed: {
    cursor: "pointer",
    color: "red",
  },
});
export default function SellCard({ data }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { favorite } = useSelector((state) => state.products);

  const [fav, setFav] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    favorite.forEach((item) => {
      if (item.itemId === data.itemId) {
        setFav(true);
      }
    });
  }, [favorite.length]);

  const handleClick = () => {
    console.log("click");
    if (!fav) {
      dispatch(addToFavorite(auth.uid, data));
    } else {
      dispatch(removeFromFav(auth.uid, data.itemId));
      setFav(false);
    }
  };

  return (
    <Card className={classes.cardContainer} raised={true}>
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
      <CardContent className={classes.cardContent}>
        <Box className={classes.flexContainer}>
          <Typography className={classes.productData} variant="h6">
            {data.productTitle}
          </Typography>

          <Box onClick={handleClick}>
            {fav ? (
              <FavoriteIcon className={classes.favRed} />
            ) : (
              <FavoriteBorderIcon className={classes.favoriteIcon} />
            )}
          </Box>
        </Box>
        <Typography className={classes.productPrice}>
          {numberFormat(data.productPrice)}
        </Typography>

        <Box className={classes.flexContainer}>
          <Typography>{data.userName}</Typography>
          <Typography>{data.sellerCity}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
