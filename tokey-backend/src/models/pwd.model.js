const mongoose = require("mongoose");

const pwdSchema = new mongoose.Schema({
  uuid: {
    required: true,
    unique: true,
    type: String,
  },
  credTitle: {
    required: true,
    type: String,
  },
  credId: {
    required: true,
    type: String,
  },
  credPassword: {
    required: true,
    type: String,
  },
  credWebsite: {
    type: String,
  },
});

module.exports = mongoose.model("pwd", pwdSchema);
