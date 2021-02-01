require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRouter = require("./routers/emailRouter");

const app = express();
app.set("port", process.env.PORT || 5000);

app
  .use(cors())
  // .use(bodyParser.json())
  .use("/email", emailRouter)
  .listen(app.get("port"));
