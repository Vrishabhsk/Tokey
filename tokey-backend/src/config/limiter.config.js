const rateLimit = require("express-rate-limit");

module.exports = {
  limiter: rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
  }),
};
