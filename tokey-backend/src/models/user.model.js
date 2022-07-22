const mongoose = require("mongoose");
const Card = require("./card.model");
const Note = require("./note.model");
const Pwd = require("./pwd.model");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  isOauth: {
    type: Boolean,
    required: true,
  },
  avatar: {
    default: "0.png",
    type: String,
    required: true,
  },
  pwds: [{ type: mongoose.Schema.Types.ObjectId, ref: Pwd }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: Note }],
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: Card }],
});

module.exports = mongoose.model("user", userSchema);
