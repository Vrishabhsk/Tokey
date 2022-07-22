const { check } = require("express-validator");

module.exports = {
  creationValidation: [
    check("noteTitle").exists().withMessage("Title for the note is required!"),
    check("noteText").exists().withMessage("Description is required!"),
  ],
  updateValidation: [
    check("uuid").exists().withMessage("ID for notes is required!"),
    check("noteTitle").exists().withMessage("Title for the note is required!"),
    check("noteText").exists().withMessage("Description is required!"),
  ],
};
