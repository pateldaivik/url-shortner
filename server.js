const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config").mongoURI;
const bodyParser = require("body-parser");
const shortener = require("./routes/api/shortner");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

app.use("/api/shortner", shortener);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port", port));
