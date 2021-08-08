import React from "react";
import ReactLoading from "react-loading";

//This is based on the ReactLoading NPM package: https://www.npmjs.com/package/react-loading
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
    </>
  );
}

export default Loading;
