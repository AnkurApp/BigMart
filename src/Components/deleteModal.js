import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../Redux/Actions/AuthActions";

const useStyles = makeStyles({
  modalContainer: {
    width: "40%",
    margin: "100px auto 0",
    border: "3px solid #C3073F",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "1.5rem 5rem",
    textAlign: "center",
  },

  heading: {
    fontSize: "18px",
    letterSpacing: "1px",
  },

  btnBox: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "1.5rem",
  },

  Btn: {
    letterSpacing: "1px",
    fontWeight: "bold",
  },
});

export default function DeleteModal(props) {
  const classes = useStyles();
  const { modalOpen, setModalOpen } = props;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(deleteAccount(auth.uid));
  };
  return (
    <Modal
      className={classes.modalContainer}
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Typography className={classes.heading}>
        {
          "Are you sure you want to delete your account, your products will also get deleted?"
        }
      </Typography>

      <Box className={classes.btnBox}>
        <Button
          variant="contained"
          color="primary"
          className={classes.Btn}
          onClick={() => handleClick()}
        >
          {"Okay"}
        </Button>
        <Button
          variant="contained"
          className={classes.Btn}
          onClick={() => setModalOpen(false)}
        >
          {"Cancel"}
        </Button>
      </Box>
    </Modal>
  );
}
