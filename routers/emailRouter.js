const express = require("express");
const nodemailer = require("nodemailer");

const emailRouter = express.Router();

emailRouter.post("/", (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailBodyUrl = `https://file-sharing-app-1.s3.ap-south-1.amazonaws.com/public/${req.body.fileName}`;
  const mailBody = `<p>Your file has been uploaded successfully! You can download your file from<p/><i>${mailBodyUrl}<i/>`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: req.body.email,
    subject: "File download link",
    html: mailBody,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) throw err;
  });
  res.status(200).send("Email send successfully");
});

module.exports = emailRouter;
