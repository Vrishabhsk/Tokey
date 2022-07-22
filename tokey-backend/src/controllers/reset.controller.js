const validation = require("../utils/validate.utils");
const User = require("../models/user.model");
const Code = require("../models/code.model");
const { badRequest, serverError } = require("../utils/response.utils");
const { sendMail } = require("../utils/mail.utils");
const { genToken, hashPassword } = require("../utils/auth.utils");

module.exports = {
  resetMail: async (req, res) => {
    //validation
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { email } = req.body;
    //email exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) return badRequest(res, "Email doesn't exist!");
    //gen code for authentication
    const code = Math.floor(100000 + Math.random() * 900000);
    //check if code is already sent
    const checkCodeExists = await Code.findOne({ email });
    //if code has been sent delete it and create a new one
    if (checkCodeExists) await Code.findOneAndDelete({ email });
    const codeEntry = new Code({ email: email, code: code });
    if (!codeEntry) return badRequest(res, "Code has already been sent!");
    await codeEntry.save();
    try {
      //mail the code
      await sendMail(
        email,
        "Enter this code to reset your password: " +
          code +
          ". This code will expire after 2 minutes!",
        "Reset Password - Tokey"
      );
      return res.status(200).json({ user: email });
    } catch (error) {
      return serverError(res);
    }
  },
  resetCodeCheck: async (req, res) => {
    //validation
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { email, code } = req.body;
    //check if code exists
    const checkCode = await Code.findOne({ email });
    if (!checkCode) return badRequest(res, "Code has expired!, Request Again!");
    try {
      if (checkCode && code !== checkCode.code) return badRequest(res, "Invalid Code!");
      //delete code
      await Code.findOneAndDelete({ email });
      //generate token for user to reset password
      const token = genToken(email, "2m");
      return res.status(200).json({ token: token });
    } catch (error) {
      return serverError(res);
    }
  },
  resetPassword: async (req, res) => {
    //validation
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { newPass, email } = req.body;
    //find user
    const user = await User.findOne({ email });
    if (!user) return badRequest(res, "Email doesn't exist!");
    if (user.isOauth)
      return badRequest(
        res,
        "You have registered via a Third Party. You cannot reset your password!"
      );
    try {
      //change password
      const hash = await hashPassword(newPass);
      await User.findByIdAndUpdate(req.user._id, { password: hash });
      //send mail
      await sendMail(
        email,
        "Your password has been changed successfully!",
        "Password Changed - Tokey"
      );
      return res.status(200).json({ message: "Password updated!" });
    } catch (error) {
      return serverError(res);
    }
  },
};
