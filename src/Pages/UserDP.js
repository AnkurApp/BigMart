import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Box,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/sidebar";

import { useDispatch, useSelector } from "react-redux";
import { updateUserPicture } from "../Redux/Actions/AuthActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  outerContainer: {
    backgroundColor: "#EAEDED",
  },

  mainContainer: {
    marginTop: "64px",
    width: "70%",
    margin: "auto",
    minHeight: "93vh",
    display: "flex",
    padding: "2rem 0",
  },

  userProfileContainer: {
    width: "100%",
    marginLeft: "1.5rem",
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginTop: "1rem",
  },

  formContainer: {
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    width: "100%",
    margin: "1rem 0",
  },

  submitBtn: {
    width: "70%",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginTop: "1rem",

    "&:hover": {
      backgroundColor: "#C3073F",
    },
  },

  selectedImage: {
    display: "block",
    width: "350px",
    height: "400px",
    marginBottom: "2rem",
  },
});
export default function UserPicture() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPicture(auth, file));

    notify("Profile Picture Updated Successfully");
    setTimeout(() => {
      history.push("/BigMart/user");
    }, 3000);
  };
  return (
    <Box className={classes.outerContainer}>
      <Navbar />

      <Box className={classes.mainContainer}>
        <Sidebar />

        <Card className={classes.userProfileContainer}>
          <Typography variant="h5" className={classes.heading}>
            {"Set User Picture"}
          </Typography>

          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField
              type="file"
              variant="outlined"
              className={classes.inputField}
              onChange={handleChange}
            />

            {image ? <img src={image} className={classes.selectedImage} /> : ""}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submitBtn}
            >
              {"Submit"}
            </Button>
          </form>
        </Card>
      </Box>
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
    </Box>
  );
}
