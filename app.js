//REQUESTS
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const mongoDB = process.env.MONGO;

const app = express();
app.use(express.static(__dirname + "/public"));

// APP things
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MONGOOSE
mongoose.connect(mongoDB, {});

const reviewSchema = new mongoose.Schema({
  reviewName: String,
  reviewBody: String,
});

const Review = mongoose.model("Review", reviewSchema);

//APP GET
app.get("/", function (req, res) {
  Review.find({}, function (err, reviewsFound) {
    console.log(reviewsFound);
    res.render("home", {
      reviews: reviewsFound,
    });
  });
});

app.get("/review", function (req, res) {
  res.render("review", {});
});

// APP POST

app.post("/addReview", function (req, res) {
  const name = req.body.reviewName;
  const body = req.body.reviewBody;
  const review = new Review({
    reviewName: name,
    reviewBody: body,
  });
  review.save();
  res.redirect("/");
});

app.listen(process.env.PORT, function () {
  console.log("Server started on port 3000");
});
