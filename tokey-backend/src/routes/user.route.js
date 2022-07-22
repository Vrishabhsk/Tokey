const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { changePassword } = require("../middlewares/validation/user.validate");

router.get("/details", UserController.userDetails);
//all user info route
router.get("/everything", UserController.everything);
//update avatar route
router.post("/change-avatar", UserController.updateAvatar);
//delete everything
router.delete("/delEverything", UserController.deleteEverything);
//delete user and its items
router.delete("/exterminate", UserController.deleteUser);

module.exports = router;
