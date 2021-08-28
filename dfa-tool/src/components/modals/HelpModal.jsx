import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

// This code is based on: https://github.com/john-smilga/react-projects/blob/master/12-sidebar-modal/final/src/Modal.js
const HelpModal = (props) => {
  const { isModalOpen, closeModal } = useGlobalContext();
  return (
    <div
      className={`${isModalOpen ? "modal-page reveal-modal" : "modal-page"}`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <button onClick={closeModal} className="main-button">
            {props.btn}
          </button>
        </div>
        <button onClick={closeModal} className="close-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(HelpModal);
