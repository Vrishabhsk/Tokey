const { check } = require("express-validator");

module.exports = {
  changePassword: [
    check("oldPass").exists().withMessage("Old password is required"),
    check("newPass")
      .exists()
      .withMessage("New password is required")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password must contain at least one letter, one number and one special character!"
      ),
  ],
  changeAvatar: [
    check("avatar").exists().withMessage("Avatar Name is required"),
  ],
};
