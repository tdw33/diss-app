import React from "react";
import CreateQuestion from "../components/CreateQuestion";
import HelpModal from "../components//modals/HelpModal";
import info from "../components/modals/modalData";

const Questions = () => {
  return (
    <div className="qcontainer">
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
