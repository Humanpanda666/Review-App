//REQUESTS
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

require("dotenv").config();
const mongoDB = process.env.MONGO_URI;

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

//DELETE
app.get("/delete/:productID", function (req, res) {
  const requestItem = req.params.productID;
  console.log(requestItem);
  Review.find({}, function (err, itemsFound) {
    if (err) {
      console.log(err);
    } else {
      itemsFound.forEach(function (item) {
        if (item._id == requestItem) {
          Review.deleteOne({ _id: requestItem }, function (err, results) {
            if (err) {
              res.send(err);
            } else {
              res.redirect("/");
            }
          });
        }
      });
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started on port 3000");
});
