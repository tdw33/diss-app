import React, { useState, useRef, useEffect } from "react";
import questions from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FormControl,
  TextField,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

var gtool = require("cfgrammar-tool");
var lib = require("dfa-lib");
var regex = require("dfa-lib/regex");
var NFA = lib.NFA;
var DFA = lib.DFA;

var evena3 = new DFA( // contains a positive even number of a's 2nd version
  ["a", "b"],
  {
    // 0: { a: "1", b: "0" },
    // 1: { a: "0", b: "1" },

    //longer notation
    0: { a: "1" },
    0: { b: "0" },
    1: { a: "0" },
    1: { b: "1" },
  },
  "0",
  ["0"]
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function SingleQuesiton() {
  const [index, setIndex] = useState(0);
  const { regex } = questions[index];
  const classes = useStyles();
  const [alphabet, setAlphabet] = useState("");
  const [initialState, setInitialState] = useState("");
  const [acceptingStates, setAcceptingStates] = useState("");

  const [inputTrans, setInputTrans] = useState([{}]);

  const handleChangeInput = (index, event) => {
    const values = [...inputTrans];
    values[index][event.target.name] = event.target.value;
    setInputTrans(values);
  };

  const handleAddFields = () => {
    setInputTrans([...inputTrans, {}]);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputTrans];
    values.splice(index, 1);
    setInputTrans(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(alphabet.split(""));
    // console.log(initialState);
    // console.log(acceptingStates);
    // console.log("inputTrans", inputTrans);
    // console.log(inputTrans.split());

    var testDFA = new DFA(
      alphabet.split(""),
      { inputTrans },
      initialState,
      acceptingStates.replace(",", "").split("")
    );
    // console.log(testDFA);
    console.log(evena3);
    inputTrans.forEach((element) => console.log(element));
    // console.log(testDFA.find_equivalence_counterexamples(evena3));
  };

  //question script
  const checkNumber = (number) => {
    if (number > questions.length - 1) {
      return 0;
    }
    if (number < 0) {
      return questions.length - 1;
    }
    return number;
  };

  const nextQuestion = () => {
    setIndex((index) => {
      let newIndex = index + 1;

      return checkNumber(newIndex);
    });
  };
  const prevQuestion = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <>
      <section className="questions">
        <h3 className="questionnumber">Question {index + 1}</h3>
        <div className="underline"></div>
        <h4 className="regex">
          Please give the equivelent DFA for the following regular expression:{" "}
          {regex}
        </h4>
        {/* <h4 className="lower">{regex}</h4> */}
        <div className="button-container">
          <button className="prev-btn" onClick={prevQuestion}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextQuestion}>
            <FaChevronRight />
          </button>
        </div>
        <div className="underline2"></div>

        {/* this is the answer part */}
        <FormControl className={classes.root}>
          <h2 className="title">Answer</h2>
          <TextField
            id="standard-full-width"
            label="Alphabet"
            placeholder="ab"
            helperText="set of input symbols (Σ)"
            margin="normal"
            onChange={(e) => setAlphabet(e.target.value)}
          />
          <TextField
            id="standard-full-width"
            label="States"
            placeholder="q1,q2"
            helperText="set of all states (Q)"
            margin="normal"
          />

          {inputTrans.map((inputTrans, index) => (
            <div className={classes.root} key={index}>
              <TextField
                id="standard-full-width"
                label="Transistion"
                value={inputTrans.Transistion}
                placeholder='0: { a: "1", b: "0" }'
                helperText="Transition Function δ"
                margin="normal"
                onChange={(event) => handleChangeInput(index, event)}
              />
              <IconButton className="formBtn">
                <RemoveIcon
                  disabled={inputTrans.length === 1}
                  onClick={handleRemoveFields}
                  fontSize="small"
                />
              </IconButton>
              <IconButton>
                <AddIcon onClick={handleAddFields} fontSize="small" />
              </IconButton>
            </div>
          ))}
          <TextField
            id="standard-full-width"
            label="Initial State"
            placeholder="q1"
            helperText="The initial state (q)"
            margin="normal"
            onChange={(e) => setInitialState(e.target.value)}
          />
          <TextField
            id="standard-full-width"
            label="Accepting States"
            placeholder="q1,q2"
            helperText="set of all accepting states (F)"
            margin="normal"
            onChange={(e) => setAcceptingStates(e.target.value)}
          />
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Check Answer
        </Button>
      </section>
    </>
  );
}
export default SingleQuesiton;
