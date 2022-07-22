const { check } = require("express-validator");

module.exports = {
  authValidation: [
    check("email")
      .exists()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is not valid!"),
    check("password")
      .exists()
      .withMessage("Password is required!")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password must contain at least one letter, one number and one special character!"
      ),
  ],

  otpValidation: [
    check("email")
      .exists()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is not valid!"),
    check("otp")
      .exists()
      .withMessage("OTP is required!")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits long!"),
  ],
};
