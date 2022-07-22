const crypto = require("crypto-js");

module.exports = {
  encrypt: (value) => {
    return crypto.AES.encrypt(value, process.env.CRYPTO_KEY).toString();
  },
  decrypt: (value) => {
    return crypto.AES.decrypt(value, process.env.CRYPTO_KEY).toString(
      crypto.enc.Utf8
    );
  },
};
