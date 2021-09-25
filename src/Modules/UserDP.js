import { makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { updateUserPicture } from "../Redux/Actions/AuthActions";

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
export default function UserPicture(props) {
  const { dpmodalOpen, setDPModalOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPicture(auth, file));

    setDPModalOpen(false);
  };
  return (
    <Modal
      className={classes.modalContainer}
      isOpen={dpmodalOpen}
      onRequestClose={() => setDPModalOpen(false)}
    >
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
