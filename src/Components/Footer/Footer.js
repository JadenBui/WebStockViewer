import React from "react";
import "./Footer.css";
import { MDBFooter, MDBIcon } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter className="page-footer font-small unique-color-dark pt-4 footer">
      <div className="container">
        <ul className="list-unstyled list-inline text-center py-2">
          <li className="list-inline-item">
            <h5 className="mb-1">
              <MDBIcon fab icon="react" />
              Website for fetching stocks data
            </h5>
          </li>
        </ul>
      </div>
      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <p> Jaden B</p>
      </div>
    </MDBFooter>
  );
};

export default Footer;
