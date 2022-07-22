const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ credentials: true }));
  app.use(cookieParser("TOKEY_COOKIE"));
};
