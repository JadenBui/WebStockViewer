import React from "react";
import "./NotFound.css";
import { MDBCard, MDBCardText, MDBCardTitle, MDBBadge } from "mdbreact";

const NotFound = () => {
  return (
    <div className="notfound">
      <MDBCard className="card-body">
        <MDBBadge className="badge" color="peach-gradient">
          <MDBCardTitle>
            <h1>404</h1>
          </MDBCardTitle>
        </MDBBadge>
        <MDBCardText>The page you try to search for is not found</MDBCardText>
      </MDBCard>
    </div>
  );
};

export default NotFound;
