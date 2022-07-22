const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//delete code after 2 minutes
codeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 122 });

module.exports = mongoose.model("code", codeSchema);
