import React, { useState, useEffect } from "react";
import "./LogOut.css";
import { MDBCard, MDBCardText, MDBProgress, MDBBadge } from "mdbreact";
import { Redirect } from "react-router-dom";
const LogOut = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Clearing the catche");

  useEffect(() => {
    const timeOut = {
      timeout1: setTimeout(() => setProgress((preV) => preV + 60), [850]),
      timeout2: setTimeout(() => setMessage("All most done"), [850]),
    };

    return () => {
      clearTimeout(timeOut.timeout1);
      clearTimeout(timeOut.timeout2);
    };
  }, [progress, message]);

  if (progress === 240) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="logout">
      <MDBCard className="card-body notice">
        <MDBBadge className="badge" color="peach-gradient">
          Thank you for using our services
        </MDBBadge>
        <MDBCardText>We're logging your cridentials out...</MDBCardText>
        <div className="flex-row">{message}...</div>
        <MDBProgress material value={progress} animated />
      </MDBCard>
    </div>
  );
};

export default LogOut;
