import { makeStyles, Box, Card, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  productCardContainer: {
    width: "80%",
    position: "absolute",
    top: "300px",
    left: "150px",
    padding: "1.5rem",
    backgroundColor: "rgba(195, 7 ,63, 0.7)",
  },

  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
  },

  cardContainer: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },

  productCard: {
    padding: "1.5rem",
  },

  viewMore: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

const sampleData = [
  {
    name: "1",
    product: "phone1",
  },
  {
    name: "2",
    product: "phone2",
  },
  {
    name: "3",
    product: "phone3",
  },
  {
    name: "4",
    product: "phone4",
  },
];

export default function ProductCard() {
  const classes = useStyles();
  return (
    <Box className={classes.productCardContainer}>
      <Box className={classes.detailsContainer}>
        <Typography className={classes.viewMore} variant="h6">
          {"View Products"}
        </Typography>
        <NavLink className={classes.viewMore} to={"/Login"}>
          {"View More"}
        </NavLink>
      </Box>
      <Box className={classes.cardContainer}>
        {sampleData.map((data, index) => {
          return (
            <Card key={index} className={classes.productCard}>
              <Typography>{data.name}</Typography>
              <Typography>{data.product}</Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
