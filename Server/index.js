import express, { urlencoded, json } from "express";
import cors from "cors";

const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);


app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "BigMart",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
