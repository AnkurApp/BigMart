import { Box, makeStyles, Typography } from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  container: {
    marginTop: "5rem",
    backgroundColor: "green",
    width: "40%",
    padding: "1rem 2rem ",
    margin: "auto",
    textAlign: "center",
    borderRadius: "10px",
  },

  confirmIcon: {
    fontSize: "60px",
    color: "#fff",
  },

  text: {
    color: "#fff",
    letterSpacing: "1px",
    margin: "0.5rem 0",
  },
});

export default function OrderConfirm() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CheckCircleIcon className={classes.confirmIcon} />
      <Typography variant="h5" className={classes.text}>
        {"Order Confirmed"}
      </Typography>
      <Typography variant="h6" className={classes.text}>
        {"Thank you for shopping with BigMart!"}
      </Typography>
      <Typography className={classes.text}>{"Visit us again"}</Typography>
    </Box>
  );
}
