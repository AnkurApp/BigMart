import {
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { numberFormat } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  orderCardContainer: {
    width: "70%",
    margin: "1rem auto",
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
  },

  productImage: {
    display: "block",
    width: "52%",
    height: "200px",
    backgroundSize: "contain",
  },

  cardContent: {
    width: "45%",
    margin: "0 auto",
  },

  flexBox: {
    display: "flex",
    justifyContent: "space-between",
  },

  textHeading: {
    marginBottom: "1rem",
    letterSpacing: "1px",
    fontWeight: "500",
  },

  text: {
    margin: "0.3rem 0",
    fontSize: "17px",
    letterSpacing: "1px",
  },
});
export default function OrderCard({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.orderCardContainer}>
      <CardMedia
        className={classes.productImage}
        component="img"
        image={data.Image1}
        alt={data.productTitle}
      />

      <CardContent className={classes.cardContent}>
        <Typography variant="h5" className={classes.textHeading}>
          {data.productTitle}
        </Typography>
        <Box>
          <Typography className={classes.text}>{`Total price: ${numberFormat(
            data.productPrice
          )}`}</Typography>
          <Typography
            className={classes.text}
          >{`Order Placed on: `}</Typography>
          <Typography className={classes.text}>{`Payment Method: `}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
