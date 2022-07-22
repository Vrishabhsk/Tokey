const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

module.exports = {
  hashPassword: async (password) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  },

  comparePassword: async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
  },

  genToken: (email, expiresIn = jwtConfig.expiresIn) => {
    return jwt.sign({ email }, jwtConfig.secret, {
      expiresIn: expiresIn,
    });
  },
};
