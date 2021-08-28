import React from "react";

//components
import CreateQuestion from "../components/CreateQuestion";
import HelpModal from "../components//modals/HelpModal";
import info from "../components/modals/modalData";

const Questions = () => {
  // first returns the form field and then helpmodal upon clicking
  return (
    <div className="ques-container">
      <CreateQuestion />
      <HelpModal
        title={info[1].title}
        mainText={info[1].mainText}
        btn={info[1].button}
      />
    </div>
  );
};

export default Questions;
