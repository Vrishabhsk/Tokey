const express = require("express");
const router = express.Router();
const passport = require("passport");

//opening the google oauth2 authentication page
router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//callback route for google to redirect to
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

module.exports = router;
