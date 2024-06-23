const express = require("express");
const router = express.Router();
const artistRoutes = require('../domains/artist');
const userRoutes = require("../domains/user");
const OTPRoutes = require("../domains/otp");
const EmailVerificationRoutes = require("../domains/email_verification");
const ForgotPasswordRoutes = require("../domains/forgot_password");

// Debug logs to check the types
console.log('userRoutes:', typeof userRoutes);
console.log('OTPRoutes:', typeof OTPRoutes);
console.log('EmailVerificationRoutes:', typeof EmailVerificationRoutes);
console.log('ForgotPasswordRoutes:', typeof ForgotPasswordRoutes);

// Ensure that the imported modules are routers
router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email_verification", EmailVerificationRoutes);
router.use("/forgot_password", ForgotPasswordRoutes);
router.use("/artist", artistRoutes); // Added artist routes

module.exports = router;
