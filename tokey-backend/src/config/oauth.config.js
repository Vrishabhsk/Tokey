require("dotenv").config();
const User = require("../models/user.model");
const { genToken } = require("../utils/auth.utils");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
  //google oauth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.TOKEY_CLIENT_ID,
        clientSecret: process.env.TOKEY_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      },
      async (access, refresh, profile, done) => {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            const newUser = new User({ email: profile.emails[0].value, isOauth: true });
            newUser.token = genToken(newUser.email);
            await newUser.save();
            return done(null, newUser);
          }
          user.token = genToken(user.email);
          await user.save();
          return done(null, user);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );
};
