import React, { useContext, useRef, useState } from "react";
import questions from "./data";


const TestContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
   const [index, setIndex] = useState(0);
  const { regex } = questions[index];

  var selectedObj = null;
  var model;

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    //     canvas.width = window.innerWidth * 2;
    //     canvas.height = window.innerHeight * 2;
    //     canvas.style.width = `${800}px`;
    //     canvas.style.height = `${600}px`;
    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    // context.lineCap = "round";
    // context.strokeStyle = "black";
    // context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const state = (x, y) => {
    // const canvas = canvasRef.current;
    // var pos = getMousePos(canvas, nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, 50, 0, 2 * Math.PI);
    contextRef.current.stroke();
  };
  const acceptingState = (nativeEvent) => {
    const canvas = canvasRef.current;
    var pos = getMousePos(canvas, nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
    contextRef.current.stroke();
  };

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  //handle the double click event
  const dblClick = (nativeEvent) => {
    if (isRunning) {
      return;
    }
    const canvas = canvasRef.current;
    var mousePos = getMousePos(canvas, nativeEvent);
    state(mousePos.x, mousePos.y);
  };

  const currentRegex = (index) => {
   
  console.log(regex)
  return regex
}

  // what gets returned to the canvas
  return (
    <TestContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        state,
        acceptingState,
        dblClick,
        currentRegex,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};



export const useCanvas = () => useContext(TestContext);

