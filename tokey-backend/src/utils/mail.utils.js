require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  //creating oauth2 client
  const oauth2Client = new OAuth2(
    process.env.TOKEY_CLIENT_ID,
    process.env.TOKEY_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  //set refresh token
  oauth2Client.setCredentials({
    refresh_token: process.env.TOKEY_REFRESH_TOKEN,
  });

  //get the access token
  const accessToken = await oauth2Client.getAccessToken();

  //create transporter for sending mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.TOKEY_EMAIL,
      accessToken,
      clientId: process.env.TOKEY_CLIENT_ID,
      clientSecret: process.env.TOKEY_CLIENT_SECRET,
      refreshToken: process.env.TOKEY_REFRESH_TOKEN,
    },
  });

  return transporter;
};

module.exports = {
  sendMail: async (receiver, message, subject) => {
    try {
      const transporter = await createTransporter();
      //generating mail object
      const mailObject = {
        from: process.env.TOKEY_EMAIL,
        to: receiver,
        subject: subject,
        text: message,
      };
      //sending mail
      transporter.sendMail(mailObject);
    } catch (error) {
      console.log(error);
    }
  },
};
