import {
  makeStyles,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { userEdit } from "../Redux/Actions/AuthActions";

const useStyles = makeStyles({
  modalContainer: {
    width: "50%",
    margin: "100px auto 0",
    border: "5px solid #C3073F",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "1.5rem",
    textAlign: "center",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    margin: "1rem auto",
  },

  inputField: {
    margin: "1rem 0",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "1rem",
  },

  btn: {
    fontWeight: "bold",
    letterSpacing: "1px",
    "&:hover": {
      backgroundColor: "#C3073F",
      border: "1px solid #fff",
      color: "#fff",
    },
  },
});

Modal.setAppElement("#root");
export default function EditProfile(props) {
  const { modalOpen, setModalOpen } = props;
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [number, setNumber] = useState(auth.phoneNo);
  const [city, setCity] = useState(auth.city);

  const [disable, setDisbale] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      email,
      number,
      city,
    };

    dispatch(userEdit(userDetails, auth));
    setModalOpen(false);
  };

  return (
    <Modal
      className={classes.modalContainer}
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Box>
        <Typography variant="h5">{"Edit Profile"}</Typography>

        <form
          className={classes.formContainer}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            type="text"
            variant="outlined"
            value={name}
            className={classes.inputField}
            onChange={(e) => {
              setName(e.target.value);
              setDisbale(false);
            }}
          />
          <TextField
            type="email"
            variant="outlined"
            value={email}
            className={classes.inputField}
            onChange={(e) => {
              setEmail(e.target.value);
              setDisbale(false);
            }}
          />

          {/* {number ? ( */}
          <TextField
            variant="outlined"
            value={number}
            className={classes.inputField}
            placeholder={"Enter Your Number"}
            onChange={(e) => {
              setNumber(e.target.value);
              setDisbale(false);
            }}
          />
          {/* ) : ( */}
          {/* <Button onClick={() => <TextField />}>{"Add Number"}</Button> */}
          {/* )} */}

          <TextField
            variant="outlined"
            value={city}
            className={classes.inputField}
            placeholder={"Enter Your City"}
            onChange={(e) => {
              setCity(e.target.value);
              setDisbale(false);
            }}
          />

          <Box className={classes.btnContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.btn}
              onClick={() => setModalOpen(false)}
            >
              {"Discard"}
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              disabled={disable}
              className={classes.btn}
            >
              {"Save Changes"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
