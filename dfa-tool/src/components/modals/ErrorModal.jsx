import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ErrorModal = (props) => {
  const { isErrorModalOpen, closeErrorModal } = useGlobalContext();

  return (
    <div
      className={`${
        isErrorModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <button onClick={closeErrorModal} className="modal-button">
            {props.button}
          </button>
        </div>
        <button onClick={closeErrorModal} className="close-modal-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(ErrorModal);
