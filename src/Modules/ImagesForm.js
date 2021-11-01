import { makeStyles, TextField, Box, Fab, Typography } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  inputField: {
    display: "none",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  imagesContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "1rem 0",
  },

  button: {
    width: "60px",
    height: "60px",
    marginBottom: "1rem",
  },
});

export default function ImagesForm({ images, setImages }) {
  const classes = useStyles();
  const handleChange = (e) => {
    const imageObj = { ...images };

    for (let i = 0; i < e.target.files.length; i++) {
      imageObj[`image${i + 1}`] = e.target.files[i];
    }
    setImages({ ...imageObj });
  };

  return (
    <Box className={classes.formContainer}>
      <TextField
        type="file"
        id="imageInput"
        variant="outlined"
        required
        inputProps={{ multiple: true }}
        className={classes.inputField}
        onChange={handleChange}
      />
      <label htmlFor="imageInput" className={classes.label}>
        <Fab component="span" className={classes.button} color={"secondary"}>
          <AddPhotoAlternateIcon fontSize={"large"} />
        </Fab>
        <Typography variant="h6">{"Upload Product Images"}</Typography>
      </label>
      <Box className={classes.imagesContainer}>
        {Object.values(images).map((image, index) => (
          <Box>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt={`Product Image ${index + 1}`}
                width={220}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
