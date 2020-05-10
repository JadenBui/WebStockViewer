import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './Layout.css'
import Footer from '../../Components/Footer/Footer'

const Layout = props => {
    return (
        <React.Fragment>
            <Navbar auth={props.auth} handleLogOut={props.handleLogOut}/>
            <div className="layout">
                {props.children}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;