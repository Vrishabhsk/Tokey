module.exports = {
  serverError: (res) => {
    return res.status(500).json({ message: "Internal server error" });
  },
  badRequest: (res, message) => {
    return res.status(400).json({ message });
  },
};
