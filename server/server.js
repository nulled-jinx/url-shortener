const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl.js");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"));

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find({}, { _id: 0, __v: 0 });
  res.status(200).send(shortUrls);
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect(process.env.FRONTEND_URL);
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
