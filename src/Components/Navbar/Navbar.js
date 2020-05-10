import "./Navbar.css";
import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";

const ToolBar = ({ auth, handleLogOut }) => {
  const [dropDown, setdropDown] = useState({ isOpen: false });
  let username = "Guest";
  let name;
  if (auth) {
    name =
      localStorage.getItem("name") === ""
        ? localStorage.getItem("name")
        : "Mr.Unknown";
    username = localStorage.getItem("email");
  }

  const toggleCollapse = () => {
    setdropDown((preV) => {
      return { isOpen: !preV.isOpen };
    });
  };

  return (
    <div className="nav-home">
      <MDBNavbar
        color="morpheus-den-gradient"
        dark
        expand="md"
        fixed="top"
        scrolling
        transparent
      >
        <MDBNavbarBrand>
          <strong className="white-text">StockJD</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={dropDown.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/stocklist">Stocks</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink exact to="/">
                Register
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <h5 style={{ display: "inline", margin: "2rem" }}>
                    {auth ? username : "Guest"}
                  </h5>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default mdbnav">
                  {auth ? (
                    <MDBDropdownItem>
                      <p>{name}</p>
                      <Link onClick={handleLogOut} to="/logout">
                        Log Out
                      </Link>
                    </MDBDropdownItem>
                  ) : (
                    <MDBDropdownItem>
                      <Link to="/login">Log In</Link>
                    </MDBDropdownItem>
                  )}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};

export default ToolBar;
