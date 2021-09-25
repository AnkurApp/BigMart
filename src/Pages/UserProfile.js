import {
  makeStyles,
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import EditProfile from "../Modules/EditProfile";

import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import AddIcon from "@material-ui/icons/Add";
import UserPicture from "../Modules/UserDP";
import UpdateNumber from "../Modules/Updatenumber";

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
    alignItems: "center",
    border: "2px solid black",
    boxShadow: "0px 5px 8px rgb(0 0 0 / 0.2)",
  },

  userName: {
    width: "100%",
    textAlign: "center",
    marginTop: "0.8rem",
  },

  editBtn: {
    fontSize: "15px",
    padding: "0.3rem 0.5rem",
    letterSpacing: "1px",

    "&:hover": {
      backgroundColor: "#C3073F",
      color: "#fff",
    },
  },

  adsContainer: {
    width: "80%",
  },

  avatarContainer: {
    position: "relative",
    cursor: "pointer",
  },

  avatar: {
    width: "100px",
    height: "100px",
  },

  addIcon: {
    position: "absolute",
    bottom: "0",
    right: "0",
  },

  divider: {
    width: "100%",
    height: "2px",
    margin: "0.7rem 0",
  },

  contactContainer: {
    width: "100%",
    marginTop: "1rem",
    textAlign: "center",
    // padding: "0rem 2rem",
  },

  flexContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0.5rem 0",
    padding: "0rem 1rem",
  },

  contactHeading: {
    fontWeight: "600",

    backgroundColor: "#DCDCDC",
    letterSpacing: "1px",
    marginBottom: "1rem",
  },

  detailsData: {
    marginLeft: "0.5rem",
    fontSize: "17px",
    fontWeight: "550",
  },

  detailsHeading: {
    fontSize: "17px",
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [dpModalOpen, setDPModalOpen] = useState(false);
  const [numberModalOpen, setNumberModalOpen] = useState(false);
  return (
    <Box className={classes.mainContainer}>
      <Navbar />

      <Box className={classes.userContainer}>
        <Box className={classes.profileContainer}>
          <Box
            className={classes.avatarContainer}
            onClick={() => setDPModalOpen(true)}
          >
            {auth.photoURL ? (
              <Avatar src={auth.photoURL} className={classes.avatar} />
            ) : (
              <Avatar className={classes.avatar} />
            )}
            <AddIcon fontSize={"large"} className={classes.addIcon} />
          </Box>

          <Typography variant="h5" className={classes.userName}>
            {auth.name}
          </Typography>

          <Divider className={classes.divider} />

          <Button
            className={classes.editBtn}
            variant={"outlined"}
            color="secondary"
            onClick={() => setModalOpen(true)}
          >
            {"Edit Profile"}
          </Button>

          {/* <Divider className={classes.divider} /> */}

          <Box className={classes.contactContainer}>
            <Typography variant="h6" className={classes.contactHeading}>
              {"Contact"}
            </Typography>

            <Box className={classes.flexContainer}>
              <Typography className={classes.detailsHeading}>
                {"Email: "}
              </Typography>
              <Typography className={classes.detailsData}>
                {auth.email}
              </Typography>
            </Box>

            {auth.phoneNo ? (
              <Box className={classes.flexContainer}>
                <Typography className={classes.detailsHeading}>
                  {"Contact Number:"}
                </Typography>
                <Typography className={classes.detailsData}>
                  {auth.phoneNo}
                </Typography>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcCallIcon />}
                style={{ padding: "0.5rem 1.5rem" }}
                onClick={() => setNumberModalOpen(true)}
              >
                {"Add Mobile Number"}
              </Button>
            )}
          </Box>
        </Box>

        {/* <Box className={classes.adsContainer}>{'y'}</Box> */}
      </Box>

      <EditProfile modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <UserPicture dpmodalOpen={dpModalOpen} setDPModalOpen={setDPModalOpen} />
      <UpdateNumber
        modalOpen={numberModalOpen}
        setModalOpen={setNumberModalOpen}
      />
    </Box>
  );
}
