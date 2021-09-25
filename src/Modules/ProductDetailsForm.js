import {
  Box,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { Controller, useFormContext } from "react-hook-form";

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

export default function ProductDetailsForm() {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box className={classes.formContainer}>
      <Controller
        control={control}
        name="productCategory"
        render={({ field }) => (
          <Select
            id="productCategory"
            label="Select Category"
            variant="outlined"
            className={classes.inputField}
           
            {...field}
          >
            <MenuItem value="sofa">{"Sofa"}</MenuItem>
            <MenuItem value="dining">{"Dining"}</MenuItem>
            <MenuItem value="beds">{"Beds"}</MenuItem>
            <MenuItem value="wardrobes">{"Wardrobes"}</MenuItem>
            <MenuItem value="homedecor">{"Home Decor"}</MenuItem>
            <MenuItem value="kidsfurniture">{"Kids Furniture"}</MenuItem>
          </Select>
        )}
      />
      <Controller
        control={control}
        name="productTitle"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            id="productTitle"
            label="Product Title"
            variant="outlined"
            placeholder="
            Mention the key features of your item (e.g. brand, model, age, type)"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.productTitle)}
            helperText={errors.productTitle?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="productDesc"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <TextField
            id="productDesc"
            label="Product Description"
            variant="outlined"
            placeholder="Include condition, features and reason for selling"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.productDesc)}
            helperText={errors.productDesc?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="productPrice"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            id="productPrice"
            label="Price"
            variant="outlined"
            placeholder="Enter Product Price"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.productPrice)}
            helperText={errors.productPrice?.message}
          />
        )}
      />
    </Box>
  );
}
