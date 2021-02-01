require("dotenv").config();

const fileUpload = require("express-fileupload");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRouter = require("./routers/emailRouter");
const fileRouter = require("./routers/fileRouter");

const app = express();
app.set("port", process.env.PORT || 5000);

const corsOptions = {
  origin: "https://file-sharing.netlify.app",
};

app
  .use(cors(corsOptions))
  .use(fileUpload())
  .use("/file", fileRouter)
  .use(bodyParser.json())
  .use("/email", emailRouter)
  .listen(app.get("port"));
