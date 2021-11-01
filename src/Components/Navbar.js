import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  TextField,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import { useState } from "react";
import AddProduct from "../Modules/Addproduct";
import UserSelect from "./Userselect";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.5rem 0",
  },

  appName: {
    fontSize: "23px",
    fontWeight: "bold",
    letterSpacing: "1px",
    cursor: "pointer",
  },

  btn: {
    backgroundColor: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "2px",
    padding: "0.3rem 1.2rem",

    "&:hover": {
      backgroundColor: "#fff",
    },
  },

  link: {
    backgroundColor: "#fff",
    padding: "0.6rem 1rem",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "bold",
    borderRadius: "3px",
    color: "#000",
  },

  searchContainer: {
    width: "40%",
    height: "45px",
    display: "flex",
    padding: "0.2rem 1rem",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
  },

  searchBar: {
    width: "95%",

    "& .MuiOutlinedInput-input": {
      padding: "0.5rem 1rem",
    },

    "& .PrivateNotchedOutline-root-12": {
      border: "none",
    },
  },

  searchIcon: {
    color: "#000",
    fontSize: "30px",
  },
});

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#C3073F", zIndex: "1300" }}
      >
        <Toolbar className={classes.navbar}>
          <Typography
            variant="h6"
            className={classes.appName}
            onClick={() => history.push("/BigMart")}
          >
            {"BigMart"}
          </Typography>

          <Box className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              type="search"
              variant="outlined"
              className={classes.searchBar}
              placeholder="Search Category"
            />
          </Box>

          <Button
            startIcon={<AddIcon />}
            className={classes.btn}
            onClick={() => setModalOpen(true)}
          >
            {"Sell"}
          </Button>

          <UserSelect />
        </Toolbar>
      </AppBar>
      <AddProduct modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
