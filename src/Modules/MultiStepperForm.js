import { useState } from "react";

import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { nanoid } from "nanoid";

import { database, storage } from "../firebase";
import { ref, set, update } from "firebase/database";
import { ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";

import ProductDetailsForm from "./ProductDetailsForm";
import UserDetailsForm from "./UserDetailsForm";
import ImagesForm from "./ImagesForm";

const useStyles = makeStyles({
  stepperFormContainer: {
    width: "70%",
    margin: "1rem auto",
    border: "1px solid #333",
    padding: "2rem",
  },

  formContainer: {
    width: "100%",
    margin: "2rem auto",
  },

  btnSection: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "1.5rem",
  },

  button: {
    padding: "0.5rem 1rem",
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "15px",
    backgroundColor: "#C3073F",
  },

  backButton: {
    backgroundColor: "#DCDCDC",

    "&:hover": {
      backgroundColor: "#C3073F",
    },
  },

  step: {
    height: "50px",
  },
});

const getSteps = () => {
  return ["Product Details", "User Details", "Product Images"];
};

const getStepContent = (step, images, setImages) => {
  switch (step) {
    case 0:
      return <ProductDetailsForm />;

    case 1:
      return <UserDetailsForm />;

    case 2:
      return <ImagesForm images={images} setImages={setImages} />;

    default:
      return "Unknown Step";
  }
};

export default function StepperForm({ setModalOpen }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const auth = useSelector((state) => state.auth);

  const methods = useForm({
    defaultValues: {
      productCategory: "",
      productTitle: "",
      productDesc: "",
      productPrice: "",
      userName: auth.name,
      userEmail: auth.email,
      useruid: auth.uid,
      phoneNo: auth.phoneNo,
      sellerCity: "",
    },
  });

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setTimeout(() => {
      setActiveStep(activeStep + 1);
    }, 500);
  };

  const uploadImage = (file, imagesRef, data, randomId, auth) => {
    uploadBytes(imagesRef, file.image).then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(strRef(imagesRef)).then((url) => {
        update(ref(database, `Sell/${data.productCategory}/${randomId}`), {
          [file.name]: url,
        });

        update(
          ref(
            database,
            `Products/${auth.uid}/${data.productCategory}/${randomId}`
          ),
          {
            [file.name]: url,
          }
        );
      });
    });
  };

  const onSubmit = (data) => {
    const uploadData = { ...data, Image1: "", Image2: "", Image3: "" };
    let randomId = nanoid();

    set(
      ref(database, `Products/${auth.uid}/${data.productCategory}/${randomId}`),
      {
        ...uploadData,
        itemId: randomId,
      }
    );
    set(ref(database, `Sell/${data.productCategory}/${randomId}`), {
      ...uploadData,
      itemId: randomId,
    });

    const imageArray = [
      { image: images.image1, name: "Image1" },
      { image: images.image2, name: "Image2" },
      { image: images.image3, name: "Image3" },
    ];
    imageArray.forEach((image) => {
      const storageRef = strRef(storage);
      const imagesRef = strRef(storageRef, `${nanoid()}`);

      uploadImage(image, imagesRef, data, randomId, auth);
    });

    setModalOpen(false);
    setImages({ image1: null, image2: null, image3: null });
  };

  return (
    <Box className={classes.stepperFormContainer}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} className={classes.step}>
            <StepLabel className={classes.step}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          {"Product Added"}
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form
              className={classes.formContainer}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {getStepContent(activeStep, images, setImages)}
              <Box className={classes.btnSection}>
                <Button
                  className={`${classes.button} ${classes.backButton}`}
                  disabled={activeStep === 0}
                  color="default"
                  onClick={handleBack}
                >
                  {"Back"}
                </Button>

                {activeStep !== steps.length - 1 ? (
                  <Button
                    className={classes.button}
                    type="button"
                    id={"nextBtn"}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {"Next"}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    id={"finishBtn"}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {"Finish"}
                  </Button>
                )}
              </Box>
            </form>
          </FormProvider>
        </>
      )}
    </Box>
  );
}
