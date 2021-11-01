import { makeStyles, Box, Typography } from "@material-ui/core";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  footerContainer: {
    width: "100%",
    backgroundColor: "#C3073F",
    padding: "0.5rem 0",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "10px 5px 8px rgb(0 0 0 / 0.2)",
  },

  categoryContainer: {
    width: "35%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  copyrightSection: {
    width: "4%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  category: {
    textTransform: "capitalize",
    cursor: "pointer",
  },

  colorWhite: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

export default function Footer() {
  const classes = useStyles();
  const history = useHistory();

  const categories = [
    "sofa",
    "dining",
    "beds",
    "wardrobes",
    "homedecor",
    "kidsfurniture",
  ];

  const { sellProducts } = useSelector((state) => state.products);
  // console.log(sellProducts);
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
              onClick={() => history.push(`/BigMart/${category}`)}
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
