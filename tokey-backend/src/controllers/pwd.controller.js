const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const validation = require("../utils/validate.utils");
const Pwd = require("../models/pwd.model");
const { serverError, badRequest } = require("../utils/response.utils");
const { encrypt } = require("../utils/crypto.utils");
const { decryptPwd } = require("../utils/decrypt.utils");

module.exports = {
  relayPwds: async (req, res) => {
    try {
      //get the passwords for the user
      const pwds = await User.find({ _id: req.user._id }).populate("pwds").exec();
      if (!pwds) return badRequest(res, "Something went wrong!");
      //send decoded values
      return res.status(200).json({ pwds: decryptPwd(pwds[0].pwds) });
    } catch (error) {
      return serverError(res);
    }
  },
  createPwd: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { credTitle, credId, credPassword, credWebsite } = req.body;
    //encrypt the values
    const encryptedCredentials = {
      uuid: uuidv4(),
      credTitle: encrypt(credTitle),
      credId: encrypt(credId),
      credPassword: encrypt(credPassword),
      credWebsite: credWebsite,
    };
    try {
      const createPwd = new Pwd(encryptedCredentials);
      await createPwd.save();
      //add the pwd id for the user
      req.user.pwds.push(createPwd);
      req.user.save();
      return res.status(200).json({ message: "Password saved!" });
    } catch (error) {
      return serverError(res);
    }
  },
  updatePwd: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { uuid, credTitle, credId, credPassword, credWebsite } = req.body;
    //encrypt
    const encryptedCredentials = {
      uuid: uuid,
      credTitle: encrypt(credTitle),
      credId: encrypt(credId),
      credPassword: encrypt(credPassword),
      credWebsite: credWebsite,
    };
    try {
      const pwd = await Pwd.findOneAndUpdate({ uuid }, encryptedCredentials);
      if (!pwd) return badRequest(res, "Couldn't find password!");
      return res.status(200).json({ message: "Password Updated!" });
    } catch (error) {
      return serverError(res);
    }
  },
  deletePwds: async (req, res) => {
    const { pwds } = req.body;
    if (!pwds) return;
    try {
      let updatePwds = req.user.pwds,
        index = 0;
      //remove pwds from user and get array of ids
      const pwdIds = pwds.map((pwd) => {
        index = updatePwds.indexOf(pwd._id);
        updatePwds.splice(index, 1);
        return pwd.uuid;
      });
      //delete pwds
      await Pwd.deleteMany({ uuid: { $in: pwdIds } });
      //save user
      await User.findByIdAndUpdate({ _id: req.user._id }, { pwds: updatePwds });
      return res.status(200).json({ message: "Successful Deletion!" });
    } catch (error) {
      return serverError(res);
    }
  },
};
