import React from "react";
import "./BackDrop.css";

const BackDrop = ({ show, clickHandler, children }) => {
  return show ? (
    <div className="backdrop" onClick={clickHandler}>
      {children}
    </div>
  ) : null;
};

export default BackDrop;
