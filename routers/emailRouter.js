const express = require("express");
const nodemailer = require("nodemailer");
let multer = require("multer");
let upload = multer();

const emailRouter = express.Router();

emailRouter
  .put("/", upload.fields([]), (req, res) => {
    // upload(req, res, function (err) {
    //   if (err) {
    //     return res.end("Error uploading file.");
    //   }
    //   res.end("File is uploaded");
    //   console.log(req.body);
    // });
    console.log(req.body);
    if (!req.files) console.log("no file found");
    const myFile = req.files.file;
    console.log(myFile);
    res.send("");
    // let dataParts = [Buffer.alloc(0)];
    // // this is so Buffer.concat doesn't error if nothing comes;
    // req.on("data", (d) => dataParts.push(d));
    // req.on("error", res.sendStatus(500));
    // req.on("close", () => {
    //   const fullData = Buffer.concat(dataParts);
    //   // you can do stuff with the data now
    //   console.log(fullData);
    // });
  })
  .post("/", (req, res) => {
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
