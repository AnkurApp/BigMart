import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";

import Cards from "../Components/Cards";
import { NavLink } from "react-router-dom";
import { register } from "../Redux/Actions/AuthActions";
import { Redirect } from "react-router";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "3rem 0",
    position: "relative",
  },

  horizontalBox: {
    width: "100%",
    padding: "0.8rem 2rem",
    marginBottom: "5rem",
    backgroundColor: "#C3073F",
  },

  registerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    width: "70%",
    backgroundColor: "#fff",
    margin: "0.5rem 0",
    padding: "0.5rem 1rem",
    borderRadius: "20px",

    "& .MuiInput-underline:before": {
      border: "none",
      transition: "none",
      content: "none",
      position: "inherit",
    },

    "& .MuiInput-underline:after": {
      border: "none",
      transition: "none",
    },
  },

  btn: {
    width: "50%",
    padding: "0.5rem 2rem",
    margin: "1.5rem 0",
    backgroundColor: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#C3073F",
    disableRipple: "true",
    height: "50px",

    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
      border: "1px solid black",
    },
  },

  verticalLine: {
    width: "60px",
    minHeight: "100vh",
    backgroundColor: "#C3073F",
    position: "absolute",
    top: "0",
    right: "320px",
  },

  formFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    color: "#fff",
    marginRight: "0.5rem",
  },
});

export default function RegisterPage() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const RegisterUser = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };
    console.log(user, "registerU");
    dispatch(register(user));

    setName("");
    setEmail("");
    setPassword("");
  };

  if (auth.authenticated === "SUCCESS") {
    return <Redirect to={"/BigMart"} />;
  }

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.horizontalBox}>
        <Typography variant="h4" className={classes.registerText}>
          {"Register To Big Mart"}
        </Typography>
      </Box>

      <Cards>
        <form
          className={classes.formContainer}
          onSubmit={(e) => RegisterUser(e)}
        >
          <TextField
            name="name"
            type="text"
            value={name}
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
            className={classes.inputField}
          />

          <TextField
            name="email"
            type="email"
            value={email}
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className={classes.inputField}
          />

          <TextField
            name="password"
            type="password"
            value={password}
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputField}
          />

          <Button type="submit" className={classes.btn}>
            {"Register"}
          </Button>
        </form>

        <Box className={classes.formFooter}>
          <Typography className={classes.footerText}>
            {"Already have an account?"}
          </Typography>
          <NavLink to={"/Login"}>{"Click Here to Login"}</NavLink>
        </Box>
      </Cards>

      <Box className={classes.verticalLine}></Box>
    </Box>
  );
}
