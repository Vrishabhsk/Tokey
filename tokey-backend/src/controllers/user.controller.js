const { badRequest, serverError } = require("../utils/response.utils");
const User = require("../models/user.model");
const Card = require("../models/card.model");
const Note = require("../models/note.model");
const Pwd = require("../models/pwd.model");
const { decryptCard, decryptNote, decryptPwd } = require("../utils/decrypt.utils");
const CardController = require("./card.controller");
const NoteController = require("./note.controller");
const PwdController = require("./pwd.controller");

module.exports = {
  userDetails: async (req, res) => {
    const user = await User.find({ _id: req.user._id });
    if (!user) return badRequest(res, "User not found!");
    res.status(200).json({ email: user[0]?.email, avatar: user[0]?.avatar });
  },
  updateAvatar: async (req, res) => {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { avatar });
    if (!user) return badRequest(res, "User not found!");
    res.status(200).json({ message: "Avatar updated!" });
  },
  everything: async (req, res) => {
    //fetch everything about a user
    const data = await User.find({ _id: req.user._id }).populate(["pwds", "notes", "cards"]).exec();
    const cards = decryptCard(data[0].cards);
    const notes = decryptNote(data[0].notes);
    const pwds = decryptPwd(data[0].pwds);
    res.status(200).json({ cards, notes, pwds });
  },
  deleteEverything: async (req, res) => {
    //delete all cards
    await CardController.deleteCards(req, res);
    //delete all notes
    await NoteController.deleteNotes(req, res);
    //delete all pwds
    await PwdController.deletePwds(req, res);
  },
  deleteUser: async (req, res) => {
    const { cards, notes, pwds } = req.user;
    try {
      await Card.deleteMany({ _id: { $in: cards } });
      await Note.deleteMany({ _id: { $in: notes } });
      await Pwd.deleteMany({ _id: { $in: pwds } });
      await User.deleteOne({ _id: req.user._id });
      res.status(200).json({ message: "Profile Deleted!" });
    } catch (error) {
      return serverError(res);
    }
  },
};
