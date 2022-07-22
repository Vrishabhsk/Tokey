const express = require("express");
const CardController = require("../controllers/card.controller");
const router = express.Router();
const {
  creationValidation,
  updateValidation,
} = require("../middlewares/validation/card.validate");

//get all passwords
router.get("/relay", CardController.relayCards);
//create a password
router.post("/publish", creationValidation, CardController.createCard);
//update a password
router.put("/modify", updateValidation, CardController.updateCard);
//delete a password
router.delete("/remove", CardController.deleteCards);

module.exports = router;
