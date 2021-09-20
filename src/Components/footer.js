import { makeStyles, Box, Typography } from "@material-ui/core";
import CopyrightIcon from "@material-ui/icons/Copyright";

const useStyles = makeStyles({
  footerContainer: {
    width: "100%",
    backgroundColor: "#C3073F",
    padding: "1rem 0",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "10px 5px 8px rgb(0 0 0 / 0.2)",
  },

  categoryContainer: {
    width: "35%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  copyrightSection: {
    width: "4%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  colorWhite: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

export default function Footer() {
  const classes = useStyles();

  const categories = [
    "Sofa",
    "Dining",
    "Beds",
    "Wardrobes",
    "Home Decor",
    "Kids Furniture",
  ];
  return (
    <Box className={classes.footerContainer}>
      <Typography variant="h5" className={`${classes.colorWhite}`}>
        {"Big Mart"}
      </Typography>
      <Box className={classes.categoryContainer}>
        {categories.map((category) => {
          return (
            <Typography
              key={category}
              className={`${classes.category} ${classes.colorWhite}`}
            >
              {category}
            </Typography>
          );
        })}
      </Box>

      <Box className={classes.copyrightSection}>
        <CopyrightIcon className={classes.colorWhite} />
        <Typography className={classes.colorWhite}>{"2021"}</Typography>
      </Box>
    </Box>
  );
}
