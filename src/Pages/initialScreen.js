import { Box, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#000",
    position: "relative",
  },

  headerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 3rem",
    position: "absolute",
    marginTop: "3rem",
    backgroundColor: "#C3073F",
  },

  mainHeading: {
    width: "85%",
    color: "#fff",
    letterSpacing: "1px",
    fontWeight: "bold",
  },

  link: {
    textDecoration: "none",
    padding: "0.6rem 1rem",
    color: "#333",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#fff",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginRight: "0.4rem",
  },

  verticalLine: {
    width: "60px",
    minHeight: "100vh",
    backgroundColor: "#C3073F",
    position: "absolute",
    right: "320px",
  },
});

export default function LandingPage() {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.mainHeading} variant="h4">
          {"Welcome to Big Mart"}
        </Typography>

        <NavLink className={classes.link} to={"/Login"}>
          {"Login"}
        </NavLink>
        <NavLink className={classes.link} to={"/Register"}>
          {"Register"}
        </NavLink>
      </Box>
      <Box className={classes.verticalLine}></Box>
    </Box>
  );
}
