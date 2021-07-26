const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB database coneciton establish");
});

//dtat schema dn model

const quizSchema = {
  quiztitle: String,
  questions: Array,
};

const Quiz = mongoose.model("Quiz", quizSchema);

//API routes
// app.get("/", function (req, res) {
//   res.send("express is here");
// });

//add quiz
app.post("/newquiz", function (req, res) {
  const quiztitle = req.body.quiztitle;
  const questions = req.body.questions;

  const newQuiz = new Quiz({
    quiztitle,
    questions,
  });

  newQuiz.save();
});

// get the quizes
app.get("/quizes", function (req, res) {
  Quiz.find().then((quizes) => res.json(quizes));
  // .catch((err) => res.status(400).json("error: " + err));
});

app.get("/singlequiz/:id", function (req, res) {
  Quiz.findById(req.params.id).then((quiz) => res.json(quiz));
  // .catch((err) => res.status(400).json("error: " + err));
});
// ... other app.use middleware
app.use(express.static(path.join(__dirname, "dfa-tool", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dfa-tool", "build", "index.html"));
});

app.listen(port, function () {
  console.log("express is running");
});
