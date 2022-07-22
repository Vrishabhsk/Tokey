const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/note.controller");
const {
  creationValidation,
  updateValidation,
} = require("../middlewares/validation/note.validate");

//get all passwords
router.get("/relay", NoteController.relayNotes);
//create a password
router.post("/publish", creationValidation, NoteController.createNote);
//update a password
router.put("/modify", updateValidation, NoteController.updateNote);
//delete a password
router.delete("/remove", NoteController.deleteNotes);

module.exports = router;
