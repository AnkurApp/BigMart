import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OrderConfirm from "../Pages/OrderConfirmPage";
import {
  numberFormat,
  removeUserCart,
  addToOrder,
  removeFromSell,
} from "../Redux/Actions/productActions";

const useStyles = makeStyles({
  mainContainer: {
    padding: "3rem 1rem",
    minHeight: "100vh",
    backgroundColor: "#EAEDED",
  },

  mainHeading: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "25px",
  },

  formContainer: {
    width: "30%",
    margin: "0 auto",
    border: "2px solid #000",
    borderRadius: "10px",
    padding: "1rem 2rem",
    animation: "fade 200ms ease-out",
    textAlign: "center",
    backgroundColor: "#fff",
  },

  formGroup: {
    margin: "0 15px 20px",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    borderStyle: "none",
    willChange: "opacity, transform",
    boxShadow:
      " 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff",
    borderRadius: "5px",
  },

  formRow: {
    display: "flex",
    flexDirection: "column",
    padding: "0.3rem",
    margin: "0.5rem 0",
  },

  formRowInput: {
    margin: "0.3rem 0",
    animation: "1ms void-animation-out",
  },

  payBtn: {
    padding: "0.5rem 2rem",
    marginTop: "1rem",
  },

  errorMessage: {
    color: " #fff",
    position: "absolute",
    display: "flex",
    justifyContent: " center",
    padding: "0 15px",
    fontSize: " 13px",
    marginTop: " 0px",
    width: "100%",
    transform: "translateY(-15px)",
    opacity: " 0",
    animation: "fade 150ms ease-out",
    animationDelay: "50ms",
    animationFillMode: "forwards",
    willChange: "opacity, transform",
  },

  // payCard: {
  //   "& ._PrivateStripeElement": {
  //     display: "flex !important",
  //     flexDirection: "column",
  //   },
  // },
});

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const auth = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.products);

  let totalPay = 0;
  cart.map((data) => (totalPay = totalPay + parseInt(data.productPrice)));

  const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    value,
    onChange,
  }) => (
    <Box className={classes.formRow}>
      <TextField
        className={classes.formRowInput}
        id={id}
        variant="outlined"
        label={label}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </Box>
  );

  const ErrorMessage = ({ children }) => (
    <div className={classes.errorMessage} role="alert">
      <svg width="16" height="16" viewBox="0 0 17 17">
        <path
          fill="#FFF"
          d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
        />
        <path
          fill="#6772e5"
          d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
        />
      </svg>
      {children}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (!error) {
      setPaymentMethod(paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: totalPay,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
        }
      } catch (error) {
        console.log("Error", error);
      }

      dispatch(removeUserCart(auth.uid));

      cart.map((data) => {
        dispatch(addToOrder(auth.uid, data, paymentMethod));
        dispatch(removeFromSell(data.productCategory, data.itemId));
      });

    } else {
      console.log(error.message);
      setError(error);
    }

    // if (error) {
    //   setError(error);
    // } else {
    //   setPaymentMethod(paymentMethod);
    //   dispatch(removeUserCart(auth.uid));

    //   cart.map((data) => {
    //     dispatch(addToOrder(auth.uid, data, paymentMethod));
    //     dispatch(removeFromSell(data.productCategory, data.itemId));
    //   });
    // }
  };

  return (
    <Box className={classes.mainContainer}>
      {!paymentMethod ? (
        <>
          <Typography variant="h6" className={classes.mainHeading}>
            {"Pay and Confirm your Order"}
          </Typography>
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <fieldset>
              <Field
                id="name"
                label="Name"
                type="text"
                placeholder="Your Name"
                required
                value={billingDetails.name}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    name: e.target.value,
                  });
                }}
              />

              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="Your Email"
                required
                value={billingDetails.email}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    email: e.target.value,
                  });
                }}
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                placeholder="Your Number"
                required
                value={billingDetails.phone}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    phone: e.target.value,
                  });
                }}
              />
            </fieldset>

            <fieldset className={classes.formGroup}>
              <Box className={classes.formRow}>
                <CardElement
                  className={classes.payCard}
                  options={CARD_OPTIONS}
                  onChange={(e) => {
                    setError(e.error);
                  }}
                />
              </Box>
            </fieldset>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <Button
              variant="contained"
              color="primary"
              className={classes.payBtn}
              type="submit"
            >
              {`Pay ${numberFormat(totalPay)}`}
            </Button>
          </form>
        </>
      ) : (
        <OrderConfirm />
      )}
    </Box>
  );
}
