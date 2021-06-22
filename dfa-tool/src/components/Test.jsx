import React, { useEffect } from "react";
import { useCanvas } from "./TestContext";

export function Test() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    clearCanvas,
    state,
    acceptingState,
    dblClick,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
      <button onClick={clearCanvas}> clear canvas </button>
      <canvas
        className="canvas"
        width="800"
        height="600"
        // onClick={state}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onDoubleClick={dblClick}
        ref={canvasRef}
      />
    </>
  );
}

// export default Test;

//   return (
//     <canvas
//       onDoubleClick={startState}
//       className="canvas"
//       width="800"
//       height="600"
//       ref={canvasRef}
//       {...props}
