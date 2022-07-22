const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const validation = require("../utils/validate.utils");
const Note = require("../models/note.model");
const { serverError, badRequest } = require("../utils/response.utils");
const { encrypt } = require("../utils/crypto.utils");
const { decryptNote } = require("../utils/decrypt.utils");

module.exports = {
  relayNotes: async (req, res) => {
    try {
      //get the notes for the user
      const notes = await User.find({ _id: req.user._id }).populate("notes").exec();
      if (!notes) return badRequest(res, "Something went wrong!");
      //send the decoded values
      return res.status(200).json({ notes: decryptNote(notes[0].notes) });
    } catch (error) {
      return serverError(res);
    }
  },
  createNote: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { noteTitle, noteText } = req.body;
    //encrypt the values
    const encryptedNote = {
      uuid: uuidv4(),
      noteTitle: encrypt(noteTitle),
      noteText: encrypt(noteText),
    };
    try {
      const createNote = new Note(encryptedNote);
      await createNote.save();
      //add the note id for the user
      req.user.notes.push(createNote);
      req.user.save();
      return res.status(200).json({ message: "Note saved!" });
    } catch (error) {
      return serverError(res);
    }
  },
  updateNote: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    const { uuid, noteTitle, noteText } = req.body;
    //encrypt
    const encryptedNote = {
      uuid: uuid,
      noteTitle: encrypt(noteTitle),
      noteText: encrypt(noteText),
    };
    try {
      const note = await Note.findOneAndUpdate({ uuid }, encryptedNote);
      if (!note) return badRequest(res, "Couldn't find note!");
      return res.status(200).json({ message: "Note Updated!" });
    } catch (error) {
      return serverError(res);
    }
  },
  deleteNotes: async (req, res) => {
    const { notes } = req.body;
    if (!notes) return;
    try {
      let updateNotes = req.user.notes,
        index = 0;
      //remove notes from user and get array of ids
      const noteIds = notes.map((note) => {
        index = updateNotes.indexOf(note._id);
        updateNotes.splice(index, 1);
        return note.uuid;
      });
      //delete notes
      await Note.deleteMany({ uuid: { $in: noteIds } });
      //update user
      await User.findByIdAndUpdate({ _id: req.user._id }, { notes: updateNotes });
      return res.status(200).json({ message: "Successful Deletion!" });
    } catch (error) {
      return serverError(res);
    }
  },
};
