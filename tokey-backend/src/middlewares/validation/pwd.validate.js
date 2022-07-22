const { check } = require("express-validator");

module.exports = {
  creationValidation: [
    check("credTitle").exists().withMessage("Title is required!"),
    check("credId").exists().withMessage("Username or Email Required!"),
    check("credPassword").exists().withMessage("Password is required!"),
  ],
  updateValidation: [
    check("uuid").exists().withMessage("ID for password required!"),
    check("credTitle").exists().withMessage("Title is required!"),
    check("credId").exists().withMessage("Username or Email Required!"),
    check("credPassword").exists().withMessage("Password is required!"),
  ],
};
