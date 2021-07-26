import React from "react";
import { useGlobalContext } from "../TestContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const HelpModal = (props) => {
  console.log(props.title);
  const { isModalOpen, closeModal } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-body">
          <h3>{props.title}</h3>
          <div className="underline"></div>
          <h4>{props.mainText}</h4>
          <button onClick={closeModal} className="modal-button">
            {props.btn}
          </button>
        </div>
        <button onClick={closeModal} className="close-modal-btn">
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
      </div>
    </div>
  );
};

export default React.memo(HelpModal);
