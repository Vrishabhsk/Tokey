const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  uuid: {
    required: true,
    unique: true,
    type: String,
  },
  noteTitle: {
    required: true,
    type: String,
  },
  noteText: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("note", notesSchema);
