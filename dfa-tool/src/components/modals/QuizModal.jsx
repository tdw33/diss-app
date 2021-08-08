import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

// This code is based on: https://github.com/john-smilga/react-projects/blob/master/12-sidebar-modal/final/src/Modal.js
const QuizModal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();
  const Evan = (
    <a href="http://madebyevan.com/fsm/" target="_blank">
      Evan
    </a>
  );
  const Bakkot = (
    <a href="https://www.npmjs.com/package/dfa-lib" target="_blank">
      Bakkot
    </a>
  );

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>Quiz Page</h3>
          <div className="underline"></div>
          <h4>
            This is the Quiz Page where you can go through the questions and try
            to answer them. To draw on the canvas you need to:
          </h4>
          <div>
            <li className="quiz-list">
              <span className="bold">Add state: </span>
              Double click on the canvas
            </li>
            <li className="quiz-list">
              <span className="bold">Make accepting state: </span>
              Double click on existing state
            </li>
            <li className="quiz-list">
              <span className="bold">Add Arrow between states: </span>
              Press shift and drag from one state to another
            </li>
            <li className="quiz-list">
              <span className="bold">Add Arrow to state: </span>
              Press shift and click on the state
            </li>
            <li className="quiz-list">
              <span className="bold">Add starting arrow: </span>
              Press shift on canvas and drag to state
            </li>
            <li className="quiz-list">
              <span className="bold">Move elements: </span>
              Click element and drag
            </li>
            <li className="quiz-list">
              <span className="bold">Delete elements: </span>
              Click element and press delete
            </li>
            <li className="quiz-list">
              <span className="bold">Add text: </span>
              Click element and type message
            </li>
            <li className="quiz-list">
              <span className="bold">Add Greek letter: </span>
              Click the element and type message with a (\), e.g (\beta)
            </li>
          </div>
          <h4>
            Each arrow can only have one letter from the alphabet on it and the
            DFA should only contain letters from the alphabet for the regular
            expression.
          </h4>
          <div className="modalLinks">
            <h5>
              The canvas code used was created by {Evan} and the checking
              algorithm was created by {Bakkot}.
            </h5>
          </div>
          <button onClick={closeModal} className="modal-button">
            Try Quiz!
          </button>
        </div>
        <button onClick={closeModal} className="close-modal-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(QuizModal);
