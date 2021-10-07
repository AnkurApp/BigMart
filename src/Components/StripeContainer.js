import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import { PUBLISHABLE_KEY } from "../StripeKeys";

const stripeTestPromise = loadStripe(PUBLISHABLE_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
