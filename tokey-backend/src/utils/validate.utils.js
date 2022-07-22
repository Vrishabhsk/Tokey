const { validationResult } = require("express-validator");

//validate fields
const validation = (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return { err: validationErrors.errors[0].msg };
  }
  return null;
};

module.exports = validation;
