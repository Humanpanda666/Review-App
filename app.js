//REQUESTS
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// APP things
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//APP GET
app.get("/", function (req, res) {
  res.send("Well hello there");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
