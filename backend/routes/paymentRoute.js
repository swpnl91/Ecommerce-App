const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);  // In front end, 'payment/process' is called using axios in Payment.js. For Routes - 'process/payment' is used

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;