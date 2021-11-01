import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromProduct,
  removeFromSell,
} from "../Redux/Actions/productActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  cardContainer: {
    margin: "1rem 0",
    width: "320px",
    height: "300px",
  },

  productImage: {
    display: "block",
    height: "70%",
    backgroundSize: "contain",
  },

  cardContent: {
    padding: "0.5rem 1.5rem",
  },

  productTitle: {
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  removeBtn: {
    width: "100%",
    padding: "0.2rem 0.5rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginTop: "0.4rem",
  },
});

export default function AdsCard({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(removeFromSell(data.productCategory, data.itemId));
    dispatch(removeFromProduct(auth.uid, data.productCategory, data.itemId));

    notify(
      `${data.productTitle}(Item Id: ${data.itemId}) deleted successfully`
    );
  };
  return (
    <>
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
          <Typography variant="h6" className={classes.productTitle}>
            {data.productTitle}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.removeBtn}
            onClick={() => handleClick()}
          >
            {"Remove Ad"}
          </Button>
        </CardContent>
      </Card>
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
