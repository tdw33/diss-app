import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const MatchingModal = (props) => {
  const { isMatchModalOpen, closeMatchModal } = useGlobalContext();
  console.log("these are the words: ", props.wordsDFA);

  return (
    <div
      className={`${
        isMatchModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <button onClick={closeMatchModal} className="modal-button">
            {props.button}
          </button>
        </div>
        <button onClick={closeMatchModal} className="close-modal-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(MatchingModal);
