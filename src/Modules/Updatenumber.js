import { makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { updateNumber } from "../Redux/Actions/AuthActions";

const useStyles = makeStyles({
  modalContainer: {
    width: "50%",
    margin: "100px auto 0",
    border: "3px solid #C3073F",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "1.5rem",
    textAlign: "center",
  },

  heading: {
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  formContainer: {
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    width: "70%",
    margin: "1rem 0",
  },

  submitBtn: {
    width: "50%",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginTop: "1rem",

    "&:hover": {
      backgroundColor: "#C3073F",
    },
  },
});
export default function UpdateNumber(props) {
  const { modalOpen, setModalOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNumber(auth, number));

    setModalOpen(false);
  };
  return (
    <Modal
      className={classes.modalContainer}
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Typography variant="h5" className={classes.heading}>
        {"Set/Update Number"}
      </Typography>

      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Enter Your Number"
          className={classes.inputField}
          onChange={handleChange}
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
    </Modal>
  );
}
