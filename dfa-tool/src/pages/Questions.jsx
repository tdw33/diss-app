import React from "react";
import CreateQuestion from "../components/CreateQuestion";
import SingleQuestion from "../components/SingleQuestion";
import AnswerForm from "../components/AnswerForm";

const Questions = () => {
  return (
    <div className="qcontainer">
      {/* <SingleQuestion /> */}
      <CreateQuestion />
    </div>
  );
};

export default Questions;
