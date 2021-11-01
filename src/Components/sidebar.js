import {
  Box,
  makeStyles,
  List,
  ListItem,
  Avatar,
  Typography,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DeleteModal from "./deleteModal";

const useStyles = makeStyles({
  sideBarContainer: {
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  userDataContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1rem",
  },

  listContainer: {
    width: "100%",
    textAlign: "center",
  },

  listItem: {
    pading: "1rem 0rem",
    fontSize: "18px",
    letterSpacing: "1px",

    "&.MuiListItem-root": {
      padding: "0.8rem",
      justifyContent: "center",
    },
  },

  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "1rem",
  },

  userName: {
    width: "100%",
    textAlign: "center",
    marginTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: "bold",
  },

  menuContainer: {
    width: "100%",
    marginTop: "1rem",

    "& .MuiList-padding": {
      padding: "0",
    },
  },
});
export default function Sidebar() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const menuValues = [
    "Your Profile",
    "Your Ads",
    "Your Orders",
    "Go to Cart",
    "Go to Favorites",
    "Change Password",
    "Delete Account",
  ];

  const handleClick = (text) => {
    if (text === "Your Profile") {
      history.push("/BigMart/user");
    } else if (text === "Your Ads") {
      history.push("/BigMart/ads");
    } else if (text === "Your Orders") {
      history.push("/BigMart/Order");
    } else if (text === "Go to Cart") {
      history.push("/BigMart/Cart");
    } else if (text === "Go to Favorites") {
      history.push("/BigMart/Favorite");
    } else if (text === "Change Password") {
      history.push("/BigMart/user/changepassword");
    } else {
      setModalOpen(true);
    }
  };
  return (
    <Box className={classes.sideBarContainer}>
      <Card className={classes.userDataContainer}>
        {auth.photoURL ? (
          <Avatar
            src={auth.photoURL}
            alt={auth.name}
            className={classes.avatar}
          />
        ) : (
          <Avatar className={classes.avatar} />
        )}

        <Box>
          <Typography>{"Hello,"}</Typography>
          <span className={classes.userName}>{auth.name}</span>
        </Box>
      </Card>

      <Card className={classes.menuContainer}>
        <List className={classes.listContainer}>
          {menuValues.map((text, index) => (
            <ListItem
              divider
              button
              key={index}
              className={classes.listItem}
              onClick={() => handleClick(text)}
            >
              {text}
            </ListItem>
          ))}
        </List>
      </Card>
      <DeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Box>
  );
}
