const express = require("express");
const awsUploadFile = require("./../services/awsService");

const fileRouter = express.Router();

fileRouter.put("/", (req, res) => {
  console.log("req.files", req.files);
  if (!req.files) console.log("no file found");
  const myFile = req.files.file;
  //   const fileName = myFile.name;
  awsUploadFile(myFile);
  console.log("myfile", myFile);
  res.status(200).send("File uploaded successfully.");
});

module.exports = fileRouter;
