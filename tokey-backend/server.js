//imports
require("dotenv").config();
const express = require("express");
const passport = require("passport");
//routes
const auth = require("./src/routes/auth.route");
const pwd = require("./src/routes/pwd.route");
const note = require("./src/routes/note.route");
const card = require("./src/routes/card.route");
const user = require("./src/routes/user.route");
const reset = require("./src/routes/reset.route");
const oauth = require("./src/routes/oauth.route");
//middleware
const jwtVerifyToken = require("./src/middlewares/auth/jwtVerifyToken");
//rate limiter
const { limiter } = require("./src/config/limiter.config");
//constants
const PORT = process.env.PORT || 5000;

//app configurations
const app = express();
app.use(limiter);
require("./src/config/app.config")(app);

//passport configurations
require("./src/config/passport.config")(passport);
require("./src/config/oauth.config")(passport);

//mongodb connection
require("./src/config/db.config");

//routes
app.use("/api/auth", auth);
app.use("/api/pwd", jwtVerifyToken, pwd);
app.use("/api/note", jwtVerifyToken, note);
app.use("/api/card", jwtVerifyToken, card);
app.use("/api/user", jwtVerifyToken, user);
app.use("/api/reset", reset);
app.use(oauth);

//listening to port
app.listen(PORT, () => console.log("Server started on port " + PORT));
