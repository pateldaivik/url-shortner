const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

const URL = require("../../models/Urls");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/", (req, res, next) => {
  console.log(req.body);

  if (req.body.url) urlData = req.body.url;
  console.log("URL is: ", urlData);

  URL.findOne({ url: urlData }, function (err, doc) {
    if (doc) {
      console.log("entry found in db");
      res.send({
        url: urlData,
        hash: doc._id,
        status: 200,
        statusTxt: "OK",
      });
    } else {
      console.log("entry NOT found in db, saving new");
      var url = new URL({
        _id: uniqid(),
        url: urlData,
        name: req.body.name,
      });
      url.save(function (err) {
        if (err) return console.error(err);
        res.send({
          url: urlData,
          hash: url._id,
          status: 200,
          statusTxt: "OK",
        });
      });
    }
  });
});

router.post("/redirect", (req, res) => {
  const hash = req.body.hash;
  URL.findOne({ _id: hash })
    .then((doc) => {
      return res.json({ url: doc.url });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Sorry, this link may have expired." });
    });
});

router.get("/", (req, res) => {
  URL.find()
    .select("name")
    .then((doc) => {
      return res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ error: "Sorry, this link may have expired." });
    });
});
module.exports = router;
