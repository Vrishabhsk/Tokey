const express = require("express");
const router = express.Router();
const PwdController = require("../controllers/pwd.controller");
const {
  creationValidation,
  updateValidation,
} = require("../middlewares/validation/pwd.validate");

//get all passwords
router.get("/relay", PwdController.relayPwds);
//create a password
router.post("/publish", creationValidation, PwdController.createPwd);
//update a password
router.put("/modify", updateValidation, PwdController.updatePwd);
//delete a password
router.delete("/remove", PwdController.deletePwds);

module.exports = router;
