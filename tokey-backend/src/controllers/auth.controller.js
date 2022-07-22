const User = require("../models/user.model");
const validation = require("../utils/validate.utils");
const { hashPassword, comparePassword, genToken } = require("../utils/auth.utils");
const { serverError, badRequest } = require("../utils/response.utils");
const Otp = require("../models/otp.model");
const { sendMail } = require("../utils/mail.utils");

module.exports = {
  //signing up user
  register: async (req, res) => {
    //validate and send error if any
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { email, password } = req.body;
    //email exists
    const checkUser = await User.findOne({ email });
    if (checkUser) return badRequest(res, "Email already exists!");
    //generate otp and create OTP doc
    const hash = await hashPassword(password);
    const otp = Math.floor(100000 + Math.random() * 900000);
    //check if otp is already sent
    const otpExists = await Otp.findOne({ email });
    //if otp has been sent delete it
    if (otpExists) await Otp.findOneAndDelete({ email });
    //create a new otp
    const user = new Otp({ email: email, password: hash, otp: otp });
    if (!user) return badRequest(res, "OTP has already been sent!");
    await user.save();
    try {
      //sending otp over mail
      await sendMail(
        email,
        "Your OTP is " + otp + ". The OTP is valid for the next 2 minutes.",
        "OTP Verification - Tokey"
      );
      //send user details
      const userDetails = await Otp.findOne({ email });
      if (userDetails) {
        const response = { user: email };
        return res.status(201).json(response);
      }
    } catch (error) {
      return serverError(res);
    }
  },

  verifyOtp: async (req, res) => {
    //validation
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { email, otp } = req.body;
    const user = await Otp.findOne({ email });
    //otp expired
    if (!user) return badRequest(res, "OTP has expired! Register Again!");
    //wrong otp
    if (user && otp !== user.otp) return badRequest(res, "Invalid OTP!");
    //generate token
    const token = genToken(email);
    //create user
    const userToSave = new User({ email: user.email, password: user.password, isOauth: false });
    if (!userToSave) return badRequest(res, "Something went wrong!");
    await userToSave.save();
    //remove otp data email
    Otp.findOneAndDelete({ email }, (err) => {
      if (err) return badRequest(res, "Something went wrong!");
    });
    try {
      await sendMail(
        email,
        "Verification Successful. Thank you for using our services!",
        "Welcome To Tokey!"
      );
      const userToSend = await User.findOne({ email });
      if (userToSend) {
        //send token
        const response = { user: email, token: token };
        return res.status(201).json(response);
      }
    } catch (error) {
      return serverError(res);
    }
  },

  login: async (req, res) => {
    //validation
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    //lookup user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return badRequest(res, "Email or password is incorrect!");
    //check passwords
    const isMatch = await comparePassword(password, user.password ?? "");
    if (!isMatch) return badRequest(res, "Email or password is incorrect!");
    try {
      if (user && isMatch) {
        //gen token
        const token = genToken(email);
        const response = { user: email, token: token };
        return res.status(200).json(response);
      }
    } catch (error) {
      return serverError(res);
    }
  },
};
