import {
  makeStyles,
  Box,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFavorite,
  numberFormat,
  removeFromCart,
} from "../Redux/Actions/productActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 1rem",
  },

  flexBox: {
    display: "flex",
  },

  itemImage: {
    display: "block",
    width: "250px",
    height: "250px",
    marginRight: "1.5rem",
  },

  text: {
    letterSpacing: "1px",
    lineHeight: "1.5",
    margin: "0.5rem 0",
  },

  span: {
    color: "green",
    fontSize: "15px",
  },

  btnGroup: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },

  btn: {
    padding: "0.1rem 0.3rem",
    textTransform: "capitalize",
    margin: "1rem",

    "&:hover": {
      color: "#C3073F",
      backgroundColor: "transparent",
    },
  },

  divider: {
    width: "1.5px",
    height: "25px",
  },
});
export default function CartCard({ data }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(auth.uid, data.itemId));
    notify("Product Deleted from Cart");
  };

  const addFav = () => {
    dispatch(addToFavorite(auth.uid, data));
    notify("Product Added to Favorites");
  };
  return (
    <>
      <Box className={classes.mainContainer}>
        <Box className={classes.flexBox}>
          <Link
            to={{
              pathname: `/BigMart/${data.productCategory}/${data.productTitle}`,
              state: data,
            }}
          >
            <img
              src={data.Image1}
              alt={data.productTitle}
              className={classes.itemImage}
            />
          </Link>

          <Box>
            <Typography variant="h5" className={classes.text}>
              {data.productTitle}
            </Typography>
            <span className={classes.span}>{"Available"}</span>
            <Typography className={classes.text}>{data.productDesc}</Typography>
            <Typography
              className={classes.text}
            >{`Location: ${data.sellerCity}`}</Typography>

            <Box className={classes.btnGroup}>
              <Button
                variant="text"
                color="default"
                className={classes.btn}
                onClick={() => handleDelete}
              >
                {"Delete"}
              </Button>
              <Divider className={classes.divider} />
              <Button
                variant="text"
                color="default"
                className={classes.btn}
                onClick={() => addFav}
              >
                {"Save for Later"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography>{numberFormat(data.productPrice)}</Typography>
      </Box>

      <Divider />

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
