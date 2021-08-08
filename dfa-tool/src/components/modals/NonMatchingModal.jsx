import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const NonMatchingModal = (props) => {
  var drawnDFA = props.drawnDFA;
  var questionDFA = props.questionDFA;
  console.log("the drawn DFA: ", drawnDFA);
  console.log("the questionDFA: ", questionDFA);
  const { isNonmatchModalOpen, closeNonmatchModal } = useGlobalContext();
  const [firstWord, setFirstWord] = useState(
    "There are no words that are accpeted by your DFA and not the regualar expression"
  );
  const [secondWord, setSecondWord] = useState(
    "There are no words that are accpeted by the regular expression and not your DFA "
  );

  function getword1(DFA, setword) {
    if (DFA == null) {
      return setword(
        "There are no words that are accpeted by your DFA and not the regualar expression"
      );
    }
    if (DFA != null) {
      return setword(
        "A word accepted by your DFA but not the regular expression is: " +
          '"' +
          DFA +
          '"'
      );
    } else {
      return DFA;
    }
  }

  function getword2(DFA, setword) {
    if (DFA == null) {
      return setword(
        "There are no words that are accpeted by the regular expression and not your DFA"
      );
    }
    if (DFA != null) {
      return setword(
        "A word accepted by the regular expression but not your DFA  is: " +
          '"' +
          DFA +
          '"'
      );
    }
  }

  useEffect(() => {
    getword1(drawnDFA, setFirstWord);
  }, [drawnDFA]);
  useEffect(() => {
    getword2(questionDFA, setSecondWord);
  }, [questionDFA]);

  // This code is based on: https://github.com/john-smilga/react-projects/blob/master/12-sidebar-modal/final/src/Modal.js
  return (
    <div
      className={`${
        isNonmatchModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <div>
            <li>{firstWord}</li>
            <li>{secondWord}</li>
          </div>
          <button onClick={closeNonmatchModal} className="modal-button">
            {props.button}
          </button>
        </div>
        <button onClick={closeNonmatchModal} className="close-modal-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(NonMatchingModal);
