import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import "./ErrorHandler.css";
const ErrorHandler = ({ error, message, confirmHandler }) => {
  return (
    <div>
      <BackDrop show={error} clickHandler={confirmHandler}>
        <h1 className="alert-danger message">
          There's something wrong with API requests: {message}
        </h1>
      </BackDrop>
    </div>
  );
};

export default ErrorHandler;
