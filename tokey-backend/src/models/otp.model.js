const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//delete doc after 2 mins and 1 sec
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

module.exports = mongoose.model("otp", otpSchema);
