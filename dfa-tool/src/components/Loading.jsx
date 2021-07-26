import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  var bubbles;
  return (
    <>
      <div className="loading">
        <ReactLoading
          className="loading"
          type={bubbles}
          color="#b2cdb1"
          height={300}
          width={150}
        />
      </div>
      {/* <h3 className="qtitle">LOADING</h3> */}
    </>
  );
}

export default Loading;
