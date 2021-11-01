import {
  makeStyles,
  Box,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEmail,
  updateCity,
  updateNumber,
} from "../Redux/Actions/AuthActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";

const useStyles = makeStyles({
  detailsContainer: {
    padding: "0 1.5rem",
  },

  label: {
    fontSize: "18px",
    letterSpacing: "1px",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },

  dataField: {
    width: "40%",

    "& .MuiOutlinedInput-input": {
      padding: "1rem",
    },

    "& .MuiInputBase-input": {
      fontSize: "18px",
      color: "#333",
      letterSpacing: "1px",
    },
  },

  btn: {
    margin: "0.3rem 0rem 1rem 0.5rem",
  },

  editBox: {
    display: "flex",
  },

  editBtn: {
    fontWeight: "bold",
    padding: "0",

    "&.MuiButton-textPrimary:hover": {
      backgroundColor: "#fff",
      padding: "0",
    },
  },

  saveBtn: {
    fontWeight: "bold",
    letterSpacing: "1px",
    marginLeft: "1.5rem",
  },
});

export default function EditDetails() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editEmail, setEditEmail] = useState(true);
  const [editNumber, setEditNumber] = useState(true);
  const [editCity, setEditCity] = useState(true);

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");

  const emailEdit = () => {
    dispatch(changeEmail(email));
    notify("Email Updated");
    setEditEmail(true);
  };

  const numberEdit = () => {
    dispatch(updateNumber(auth, number));
    notify("Number Updated");
    setEditNumber(false);
  };

  const cityEdit = () => {
    dispatch(updateCity(auth, city));
    notify("City Updated");
    setEditCity(false);
  };
  return (
    <Box className={classes.detailsContainer}>
      <Typography className={classes.label}>{`Name:`}</Typography>
      <TextField
        variant="outlined"
        className={classes.dataField}
        value={auth.name}
        disabled={true}
      />

      <Typography className={classes.label}>{`Email Address:`}</Typography>
      <Box className={classes.editBox}>
        <TextField
          variant="outlined"
          type="email"
          className={classes.dataField}
          value={auth.email}
          disabled={editEmail}
          onChange={(e) => setEmail(e.target.value)}
        />

        {editEmail ? (
          <Button
            variant="text"
            color="primary"
            className={classes.editBtn}
            onClick={() => setEditEmail(false)}
          >
            {"Edit"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.saveBtn}
            onClick={() => emailEdit()}
          >
            {"Save"}
          </Button>
        )}
      </Box>

      <Typography className={classes.label}>{`Mobile Number:`}</Typography>
      {auth.photoURL ? (
        <Box className={classes.editBox}>
          <TextField
            variant="outlined"
            className={classes.dataField}
            defaultValue={auth.phoneNo}
            disabled={editNumber}
            onChange={(e) => setNumber(e.target.value)}
          />
          {editNumber ? (
            <Button
              variant="text"
              color="primary"
              className={classes.editBtn}
              onClick={() => setEditNumber(false)}
            >
              {"Edit"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.saveBtn}
              onClick={() => numberEdit()}
            >
              {"Save"}
            </Button>
          )}
        </Box>
      ) : (
        <Button className={classes.btn} variant="contained" color="primary">
          {"Add Number"}
        </Button>
      )}

      <Typography className={classes.label}>{`City:`}</Typography>
      {auth.city ? (
        <Box className={classes.editBox}>
          <TextField
            variant="outlined"
            className={classes.dataField}
            value={auth.city}
            disabled={editCity}
            onChange={(e) => setCity(e.target.value)}
          />
          {editCity ? (
            <Button
              variant="text"
              color="primary"
              className={classes.editBtn}
              onClick={() => setEditCity(false)}
            >
              {"Edit"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.saveBtn}
              onClick={() => cityEdit()}
            >
              {"Save"}
            </Button>
          )}
        </Box>
      ) : (
        <Button className={classes.btn} variant="contained" color="primary">
          {"Add City"}
        </Button>
      )}

      <ToastContainer
        position="top-center"
        autoClose={1000}
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
