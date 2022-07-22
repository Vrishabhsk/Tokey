const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const validation = require("../utils/validate.utils");
const Card = require("../models/card.model");
const { serverError, badRequest } = require("../utils/response.utils");
const { encrypt } = require("../utils/crypto.utils");
const { decryptCard } = require("../utils/decrypt.utils");

module.exports = {
  relayCards: async (req, res) => {
    try {
      const cards = await User.find({ _id: req.user._id }).populate("cards").exec();
      if (!cards) return badRequest(res, "Something went wrong!");
      //send the decoded the values
      return res.status(200).json({ cards: decryptCard(cards[0].cards) });
    } catch (error) {
      return serverError(res);
    }
  },
  createCard: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    //encrypting card info
    let encryptedCard = {
      uuid: uuidv4(),
      cardTitle: encrypt(req.body.cardTitle),
      cardHolder: encrypt(req.body.cardHolder),
      cardNumber: encrypt(req.body.cardNumber),
      cardExp: req.body.cardExp ? encrypt(req.body.cardExp) : null,
      cardCvv: req.body.cardCvv ? encrypt(req.body.cardCvv) : null,
      cardPin: req.body.cardPin ? encrypt(req.body.cardPin) : null,
      cardPc: req.body.cardPc ? encrypt(req.body.cardPc) : null,
    };
    try {
      const createCard = new Card(encryptedCard);
      await createCard.save();
      //add the card id for the user
      req.user.cards.push(createCard);
      req.user.save();
      return res.status(200).json({ message: "Card saved!" });
    } catch (error) {
      return serverError(res);
    }
  },
  updateCard: async (req, res) => {
    const invalid = validation(req, res);
    if (invalid) return badRequest(res, invalid.err);
    //encrypting card info
    const encryptedCard = {
      uuid: req.body.uuid,
      cardTitle: encrypt(req.body.cardTitle),
      cardHolder: encrypt(req.body.cardHolder),
      cardNumber: encrypt(req.body.cardNumber),
      cardExp: req.body.cardExp ? encrypt(req.body.cardExp) : null,
      cardCvv: req.body.cardCvv ? encrypt(req.body.cardCvv) : null,
      cardPin: req.body.cardPin ? encrypt(req.body.cardPin) : null,
      cardPc: req.body.cardPc ? encrypt(req.body.cardPc) : null,
    };
    try {
      const card = await Card.findOneAndUpdate({ uuid: req.body.uuid }, encryptedCard);
      if (!card) return badRequest(res, "Card not found!");
      return res.status(200).json({ message: "Card updated!" });
    } catch (error) {
      return serverError(res);
    }
  },
  deleteCards: async (req, res) => {
    const { cards } = req.body;
    if (!cards) return;
    try {
      let updateCards = req.user.cards,
        index = 0;
      //remove cards from user records
      const cardIds = cards.map((card) => {
        index = updateCards.indexOf(card._id);
        updateCards.splice(index, 1);
        return card.uuid;
      });
      //remove cards from db
      await Card.deleteMany({ uuid: { $in: cardIds } });
      //update user
      await User.findByIdAndUpdate({ _id: req.user._id }, { cards: updateCards });
      return res.status(200).json({ message: "Successful Deletion!" });
    } catch (error) {
      return serverError(res);
    }
  },
};
