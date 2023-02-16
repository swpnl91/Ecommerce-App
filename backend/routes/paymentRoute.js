const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);  // payment/process or process/payment?!

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;