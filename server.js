const express = require("express");
const app = express();
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
  console.log("mongoDB database coneciton is running");
});

//data schema of model

const quizSchema = {
  quiztitle: String,
  questions: Array,
};

const Quiz = mongoose.model("Quiz", quizSchema);

//API

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

// remove a quiz
app.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  Quiz.findByIdAndDelete({ _id: id }, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

// get the quizes
app.get("/quizes", function (req, res) {
  Quiz.find().then((quizes) => res.json(quizes));
});

//get single quiz using id
app.get("/singlequiz/:id", function (req, res) {
  Quiz.findById(req.params.id).then((quiz) => res.json(quiz));
});

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "dfa-tool", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dfa-tool", "build", "index.html"));
});

app.listen(port, function () {
  console.log("express is running");
});
