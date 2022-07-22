const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const {
  authValidation,
  otpValidation,
} = require("../middlewares/validation/auth.validate");

//register
router.post("/register", authValidation, AuthController.register);
//login
router.post("/login", authValidation, AuthController.login);
//verify otp
router.post("/verify-otp", otpValidation, AuthController.verifyOtp);

module.exports = router;
