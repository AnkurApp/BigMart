import { makeStyles, Box, Avatar, List, ListItem } from "@material-ui/core";
import { useState } from "react";

import { Logout } from "../Redux/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  selectContainer: {
    cursor: "pointer",
    position: "relative",
    width: "200px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  optionsOuterContainer: {
    width: "100%",
    position: "absolute",
    top: "70px",
    color: "#000",
    boxShadow: "0px 5px 8px rgb(0 0 0 / 0.2)",
  },

  listItem: {
    height: "40px",
    padding: "0.65rem 1rem",
    borderBottom: "1px solid #F5F5F5",
    backgroundColor: "#fff",

    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },

  link: {
    textDecoration: "none",
    color: "#000",
  },
});

export default function UserSelect() {
  const classes = useStyles();
  const [displaySelect, setDisplaySelect] = useState(false);

  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const dispatch = useDispatch();
  return (
    <Box
      className={classes.selectContainer}
      onClick={() => setDisplaySelect(!displaySelect)}
    >
      {auth.photoURL ? (
        <Avatar src={auth.photoURL} alt={auth.name} />
      ) : (
        <Avatar src="/broken-image.jpg" />
      )}

      <Box
        className={classes.optionsOuterContainer}
        style={displaySelect ? { display: "block" } : { display: "none" }}
      >
        <List style={{ margin: "0", padding: "0" }}>
          <ListItem className={classes.listItem}>
            <NavLink to={"/BigMart/user"} className={classes.link}>
              {"Your Account"}
            </NavLink>
          </ListItem>

          <ListItem className={classes.listItem}>
            <NavLink to={"/BigMart/ads"} className={classes.link}>
              {"Your Ads"}
            </NavLink>
          </ListItem>

          <ListItem className={classes.listItem}>
            <NavLink to={"/BigMart/Order"} className={classes.link}>
              {"Your Orders"}
            </NavLink>
          </ListItem>

          <ListItem className={classes.listItem}>
            <NavLink to={"/BigMart/Cart"} className={classes.link}>
              {"Your Cart"}
            </NavLink>
          </ListItem>

          <ListItem className={classes.listItem}>
            <NavLink to={"/BigMart/Favorite"} className={classes.link}>
              {"Favorites"}
            </NavLink>
          </ListItem>

          <ListItem className={classes.listItem}>
            <NavLink
              to={"/Login"}
              className={classes.link}
              onClick={() => {
                history.push("/");
                dispatch(Logout());
              }}
            >
              {"Logout"}
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
