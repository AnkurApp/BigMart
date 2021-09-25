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
import { useState } from "react";

const useStyles = makeStyles({
  cardContainer: {
    width: "80%",
    height: "300px",
    padding: "1rem",
    borderLeft: "5px solid #C3073F",
    borderRight: "5px solid #C3073F",
  },

  productImage: {
    display: "block",
    height: "65%",
    
  },

  cardContent: {
    height: "35%",
    marginTop: "0.5rem",
    padding: "0.5rem",
  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productData: {
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  favoriteIcon: {
    cursor: "pointer",
  },
});
export default function SellCard({ data }) {
  const classes = useStyles();

  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(true);
  };

  return (
    <Card className={classes.cardContainer}>
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
            {state ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon className={classes.favoriteIcon} />
            )}
          </Box>
        </Box>
        <Typography className={classes.productData}>
          {`Rs ${data.productPrice}`}
        </Typography>

        <Box className={classes.flexContainer}>
          <Typography>{data.userName}</Typography>
          <Typography>{data.sellerCity}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
