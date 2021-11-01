import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import UpdateNumber from "../Modules/Updatenumber";
import Sidebar from "../Components/sidebar";
import { useHistory } from "react-router";
import EditDetails from "../Components/editDetails";
import Footer from "../Components/footer";

const useStyles = makeStyles({
  outerContainer: {
    backgroundColor: "#EAEDED",
  },

  mainContainer: {
    marginTop: "64px",
    width: "70%",
    margin: "auto",
    minHeight: "88.15vh",
    display: "flex",
    padding: "2rem 0",
  },

  userProfileContainer: {
    width: "100%",
    height: "100%",
    marginLeft: "1.5rem",
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  userImage: {
    display: "block",
    width: "20%",
    height: "200px",
    backgroundSize: "contain",
    marginBottom: "1rem",
  },

  cardContent: {
    width: "100%",
    marginTop: "2rem",
    padding: "0 2rem",
  },

  heading: {
    fontWeight: "bold",
    margin: "0.5rem",
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  return (
    <Box className={classes.outerContainer}>
      <Navbar />

      <Box className={classes.mainContainer}>
        <Sidebar />

        <Card className={classes.userProfileContainer}>
          <Avatar src={auth.photoURL} className={classes.userImage} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/Bigmart/user/userpicture")}
          >
            {"Change Profile Picture"}
          </Button>

          <CardContent className={classes.cardContent}>
            <Typography variant="h5" className={classes.heading}>
              {"Personal Information"}
            </Typography>

            <EditDetails />
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}
