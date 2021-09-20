import {
  Card,
  Box,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import bgImage from "../Assets/alexandra-gorn-JIUjvqe2ZHg-unsplash.jpg";

const useStyles = makeStyles({
  cardContainer: {
    width: "22%",
    marginTop: "100px",
    height: "350px",
    padding: "1.5rem",
    cursor: "pointer",
    borderLeft: "5px solid #C3073F",
    borderRight: "5px solid #C3073F",
  },

  productImage: {
    display: "block",
    height: "70%",
  },

  cardContent: {
    height: "30%",
    margin: "1rem 0",
    borderLeft: "5px solid #C3073F",
    borderRight: "5px solid #C3073F",
    padding: "0.5rem 1rem",
  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productData: {
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  favoriteIcon: {
    cursor: "pointer",
  },
});
export default function SellCard() {
  const classes = useStyles();
  const data = {
    phoneNo: "8376825525",
    productCategory: "beds",
    productDesc: "A king sized bed in good condition",
    productPrice: "10000",
    productTitle: "Double bed",
    sellerCity: "Ghaziabad",
    userEmail: "ankurkumar1299@gmail.com",
    userName: "Ankur Kumar",
  };
  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        className={classes.productImage}
        component="img"
        image={bgImage}
        alt={data.productTitle}
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.flexContainer}>
          <Typography className={classes.productData} variant="h6">
            {data.productTitle}
          </Typography>
          <FavoriteBorderIcon className={classes.favoriteIcon} />
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
