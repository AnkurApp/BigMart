import { makeStyles, Box, Typography, Avatar, Button } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import EditProfile from "../Modules/EditProfile";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "100px",
    position: "relative",
  },

  userContainer: {
    display: "flex",
  },

  profileContainer: {
    width: "20%",
    position: "absolute",
    top: "2rem",
    left: "6%",
    padding: "1rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid black",
    boxShadow: "0px 5px 8px rgb(0 0 0 / 0.2)",
  },

  userName: {
    width: "100%",
    textAlign: "center",
    margin: "1rem 0",
    borderBottom: "1px solid black",
  },

  editBtn: {
    color: "#000",
    fontSize: "15px",
    padding: "0.3rem 0.5rem",
    backgroundColor: "#fff",
    border: "2px solid #C3073F",
    letterSpacing: "1px",

    "&:hover": {
      backgroundColor: "#C3073F",
      color: "#fff",
      border: "2px solid #fff",
    },
  },

  adsContainer: {
    width: "80%",
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Box className={classes.mainContainer}>
      <Navbar />

      <Box className={classes.userContainer}>
        <Box className={classes.profileContainer}>
          <Avatar />
          <Typography variant="h5" className={classes.userName}>
            {auth.name}
          </Typography>

          <Button
            className={classes.editBtn}
            onClick={() => setModalOpen(true)}
          >
            {"Edit Profile"}
          </Button>
        </Box>

        {/* <Box className={classes.adsContainer}>{'y'}</Box> */}
      </Box>

      <EditProfile modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Box>
  );
}
