import React, { useState, useRef, useEffect } from "react";
import questions from "./data";
import SingleQuesiton from "./SingleQuestion";
import { useCanvas } from "./TestContext";

function AnswerForm() {

  const {
   currentRegex,
  } = useCanvas();

  let test = currentRegex()

  console.log(test)
  return <h1>answer</h1>;
}

export default AnswerForm;
