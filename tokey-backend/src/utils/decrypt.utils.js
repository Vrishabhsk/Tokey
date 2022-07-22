const { decrypt } = require("./crypto.utils");

module.exports = {
  decryptCard: (cards) => {
    return cards.map((card) => ({
      _id: card._id,
      uuid: card.uuid,
      cardTitle: decrypt(card.cardTitle),
      cardHolder: decrypt(card.cardHolder),
      cardNumber: decrypt(card.cardNumber),
      cardExp: card.cardExp ? decrypt(card.cardExp) : null,
      cardCvv: card.cardCvv ? decrypt(card.cardCvv) : null,
      cardPin: card.cardPin ? decrypt(card.cardPin) : null,
      cardPc: card.cardPc ? decrypt(card.cardPc) : null,
    }));
  },
  decryptPwd: (pwds) => {
    return pwds.map((pwd) => ({
      _id: pwd._id,
      uuid: pwd.uuid,
      credTitle: decrypt(pwd.credTitle),
      credId: decrypt(pwd.credId),
      credPassword: decrypt(pwd.credPassword),
      credWebsite: pwd.credWebsite ?? null,
    }));
  },
  decryptNote: (notes) => {
    return notes.map((note) => ({
      _id: note._id,
      uuid: note.uuid,
      noteTitle: decrypt(note.noteTitle),
      noteText: decrypt(note.noteText),
    }));
  },
};
