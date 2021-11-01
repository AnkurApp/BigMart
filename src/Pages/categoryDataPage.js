import {
  Box,
  makeStyles,
  Breadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router";
import Footer from "../Components/footer";
import Navbar from "../Components/Navbar";
import SellCard from "../Components/sellproductCard";
import { getCategoryProduct } from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  container: {
    marginTop: "64px",
    minHeight: "88.15vh",
    padding: "2rem",
  },
  categoryDataContainer: {
    marginTop: "1.5rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "2rem",
  },

  categoryName: {
    fontSize: "25px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#C3073F",
    textAlign: "center",
  },
});
function CategoryData(props) {
  const classes = useStyles();
  const { categoryData } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { category } = useParams();
  console.log("cat", category, props);

  useEffect(() => {
    dispatch(getCategoryProduct(category));
  }, [category]);

  return (
    <Box className={classes.mainContainer}>
      <Navbar />
      {categoryData.length > 0 ? (
        <Box className={classes.container}>
          <Typography className={classes.categoryName}>{category}</Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/BigMart">
              Home
            </Link>

            <Typography
              style={{ color: "#C3073F", textTransform: "capitalize" }}
            >
              {category}
            </Typography>
          </Breadcrumbs>

          <Box className={classes.categoryDataContainer}>
            {categoryData.map((data, index) => {
              return <SellCard data={data} key={index} />;
            })}
          </Box>
        </Box>
      ) : (
        ""
      )}

      <Footer />
    </Box>
  );
}

export default withRouter(CategoryData);
