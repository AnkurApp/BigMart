import { makeStyles } from "@material-ui/core";
import Modal from "react-modal";
import StepperForm from "./MultiStepperForm";

const useStyles = makeStyles({
  modalContainer: {
    zIndex: "1500",
    width: "80%",
    margin: "7rem auto",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
});

Modal.setAppElement("#root");

export default function AddProduct({ modalOpen, setModalOpen }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modalContainer}
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <StepperForm setModalOpen={setModalOpen} />
    </Modal>
  );
}
