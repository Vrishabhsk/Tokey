const { check } = require("express-validator");

module.exports = {
  resetMail: [check("email").isEmail().withMessage("Email is required!")],
  resetCodeCheck: [
    check("email").isEmail().withMessage("Email is required!"),
    check("code")
      .exists()
      .withMessage("Code is required!")
      .isLength({ min: 6, max: 6 })
      .withMessage("Code is invalid!"),
  ],
  resetPassword: [
    check("email")
      .exists()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Invalid email!"),
    check("newPass")
      .exists()
      .withMessage("Password is required!")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password must contain at least one letter, one number and one special character!"
      ),
  ],
};
