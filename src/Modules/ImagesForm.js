import { makeStyles, TextField, Box } from "@material-ui/core";

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

export default function ImagesForm() {
  const classes = useStyles();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box className={classes.formContainer}>
      <Controller
        control={control}
        name="Image1"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <>
            {console.log(field)}
            <TextField
              type="file"
              id="Image1"
              variant="outlined"
              className={classes.inputField}
              {...field}
              error={Boolean(errors?.Image1)}
              helperText={errors.Image1?.message}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="Image2"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            type="file"
            id="Image2"
            variant="outlined"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.Image2)}
            helperText={errors.Image2?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="Image3"
        rules={{ required: "This Field is required." }}
        render={({ field }) => (
          <TextField
            type="file"
            id="Image3"
            variant="outlined"
            className={classes.inputField}
            {...field}
            error={Boolean(errors?.Image3)}
            helperText={errors.Image3?.message}
          />
        )}
      />
    </Box>
  );
}
