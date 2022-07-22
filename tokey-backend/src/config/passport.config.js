const User = require("../models/user.model");
const jwtConfig = require("./jwt.config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
  };
  //authenticating user
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      User.findOne({ email: jwtPayload.email }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    })
  );
};
