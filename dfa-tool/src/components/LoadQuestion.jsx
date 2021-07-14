import React, { useState, useRef, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
import questions from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HTML from "./HTML";

var gtool = require("cfgrammar-tool");
var lib = require("dfa-lib");
var regex = require("dfa-lib/regex");
var NFA = lib.NFA;
var DFA = lib.DFA;

function LoadQuestion() {
  var evena = new DFA( // contains a positive even number of a's
    ["a", "b"],
    {
      0: { a: "1", b: "0" },
      1: { a: "2", b: "1" },
      2: { a: "3", b: "2" },
      3: { a: "2", b: "3" },
    },
    "0",
    ["2"]
  );

  var evena2 = new DFA( // contains a positive even number of a's 2nd version
    ["a", "b"],
    {
      0: { a: "1", b: "0" },
      1: { a: "2", b: "1" },
      2: { a: "1", b: "2" },
    },
    "0",
    ["2"]
  );
  var evena3 = new DFA( // contains a positive even number of a's 2nd version
    ["a", "b"],
    {
      0: { a: "1", b: "0" },
      1: { a: "0", b: "1" },
    },
    "0",
    ["0"]
  );

  console.log(evena3);

  var oddb = new DFA( // ends in an odd number of b's
    ["a", "b"], // alphabet
    {
      // transition table
      0: { a: "0", b: "1" },
      1: { a: "0", b: "0" },
    },
    "0", // start state
    ["1"] // accepting states
  );

  var easyreg = "(b*|ab*ab*)*";
  var alp = ["a", "b"];

  function decidability(DFAa, DFAb) {
    const testb = DFAa.find_equivalence_counterexamples(DFAb);
    if (testb[0] == null && testb[1] == null) {
      return true;
    } else {
      return false;
    }
  }

  function regToDFA(a, b) {
    var newNFA = regex(a, b);
    var newDFA = newNFA.to_DFA().minimized();
    return newDFA;
  }

  // This sets up all the questions

  const [index, setIndex] = useState(0);
  const { regex } = questions[index];

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
  // console.log(decidability(evena, evena2));
  // console.log(evena.find_equivalence_counterexamples(evena2));
  //   console.log(regex(easyreg, alp));
  // console.log(regToDFA(easyreg, alp));
  // console.log(decidability(evena3, regToDFA(easyreg, alp)));
  // console.log(evena3.find_equivalence_counterexamples(regToDFA(easyreg, alp)));

  return (
    <section className="questions">
      <h3 className="questionnumber">Question {index + 1}</h3>
      <div className="underline"></div>
      <h4 className="regex">
        Please give the equivelent DFA for the following regular expression:{" "}
        {regex}
      </h4>
      {/* <h4>the even3a DFA {this.props.DFAanswer}</h4> */}
      <div className="button-container">
        <button className="prev-btn" onClick={prevQuestion}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextQuestion}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default LoadQuestion;
