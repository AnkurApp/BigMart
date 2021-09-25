import { makeStyles, TextField, Box } from "@material-ui/core";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  inputField: {
    width: "70%",
    margin: "1rem auto",
  },
});

export default function ImagesForm({ images, setImages }) {
  const classes = useStyles();
  const handleChange = (e) => {
    setImages({ ...images, [e.target.id]: e.target.files[0] });
  };

  return (
    <Box className={classes.formContainer}>
      <TextField
        type="file"
        id="image1"
        variant="outlined"
        className={classes.inputField}
        onChange={handleChange}
      />
      <TextField
        type="file"
        id="image2"
        variant="outlined"
        className={classes.inputField}
        onChange={handleChange}
      />
      <TextField
        type="file"
        id="image3"
        variant="outlined"
        className={classes.inputField}
        onChange={handleChange}
      />
    </Box>
  );
}
