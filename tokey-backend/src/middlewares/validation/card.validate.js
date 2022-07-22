const { check } = require("express-validator");

module.exports = {
  creationValidation: [
    check("cardTitle").exists().withMessage("Title is required!"),
    check("cardHolder").exists().withMessage("Holder is required!"),
    check("cardNumber").exists().withMessage("Number is required!"),
  ],
  updateValidation: [
    check("uuid").exists().withMessage("ID for card required!"),
    check("cardTitle").exists().withMessage("Title is required!"),
    check("cardHolder").exists().withMessage("Holder is required!"),
    check("cardNumber").exists().withMessage("Number is required!"),
  ],
};
