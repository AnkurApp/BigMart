import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Box,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/sidebar";
import { changePassword } from "../Redux/Actions/AuthActions";
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

  changeContainer: {
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
    width: "50%",
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
});

export default function PasswordChange() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password, confirmpass);
    if (password === confirmpass) {
      dispatch(changePassword(password));

      notify("Password Updated Successfully");
      setTimeout(() => {
        history.push("/BigMart/user");
      }, 3000);
    }
  };
  return (
    <Box className={classes.outerContainer}>
      <Navbar />
      <Box className={classes.mainContainer}>
        <Sidebar />

        <Card className={classes.changeContainer}>
          <Typography variant="h5" className={classes.heading}>
            {"Set Password"}
          </Typography>

          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField
              type="password"
              variant="outlined"
              className={classes.inputField}
              value={password}
              placeholder="New Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              type="password"
              variant="outlined"
              className={classes.inputField}
              value={confirmpass}
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmpass(e.target.value)}
            />

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
