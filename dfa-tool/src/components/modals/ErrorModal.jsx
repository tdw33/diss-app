import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

// This code is based on: https://github.com/john-smilga/react-projects/blob/master/12-sidebar-modal/final/src/Modal.js
const ErrorModal = (props) => {
  const { isErrorModalOpen, closeErrorModal } = useGlobalContext();

  return (
    <div
      className={`${
        isErrorModalOpen ? "modal-page reveal-modal" : "modal-page"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <button onClick={closeErrorModal} className="main-button">
            {props.button}
          </button>
        </div>
        <button onClick={closeErrorModal} className="close-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(ErrorModal);
