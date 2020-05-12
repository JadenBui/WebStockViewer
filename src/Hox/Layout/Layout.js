import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Layout.css";
import Footer from "../../Components/Footer/Footer";

const Layout = ({auth,handleLogOut,children}) => {
  return (
    <React.Fragment>
      <Navbar auth={auth} handleLogOut={handleLogOut} />
      <div className="layout">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
