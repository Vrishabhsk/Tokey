const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardExp: String,
  cardCvv: String,
  cardPin: String,
  cardPc: String,
});

module.exports = mongoose.model("card", cardSchema);
