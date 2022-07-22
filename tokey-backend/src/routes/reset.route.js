const express = require("express");
const {
  resetMail,
  resetCodeCheck,
  resetPassword,
} = require("../middlewares/validation/reset.validate");
const ResetController = require("../controllers/reset.controller");
const jwtVerifyToken = require("../middlewares/auth/jwtVerifyToken");
const router = express.Router();

//send reset code on mail
router.post("/mail", resetMail, ResetController.resetMail);
//check reset code
router.post("/code", resetCodeCheck, ResetController.resetCodeCheck);
//reset password
router.post(
  "/password",
  jwtVerifyToken,
  resetPassword,
  ResetController.resetPassword
);

module.exports = router;
