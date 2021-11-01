import { makeStyles, Box, TextField } from "@material-ui/core";

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

export default function UserDetailsForm() {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box className={classes.formContainer}>
      <Controller
        control={control}
        name="userName"
        render={({ field }) => (
          <TextField
            id="userName"
            label="Seller Name"
            variant="outlined"
            required
            disabled={true}
            className={classes.inputField}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="userEmail"
        render={({ field }) => (
          <TextField
            id="userEmail"
            label="Seller Email"
            variant="outlined"
            required
            disabled={true}
            className={classes.inputField}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNo"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            id="phoneNo"
            label="Seller Number"
            variant="outlined"
            required
            placeholder="Enter your Number"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.phoneNo)}
            helperText={errors.phoneNo?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="sellerCity"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            id="sellerCity"
            label="Seller City"
            variant="outlined"
            placeholder="Enter Your City"
            required
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.sellerCity)}
            helperText={errors.sellerCity?.message}
          />
        )}
      />
    </Box>
  );
}
