import React from 'react'
import { MDBAnimation } from "mdbreact";
import './Login.css'
import { Redirect } from 'react-router-dom';
const Login = ({ onSubmit, handleEmail, handlePassword, auth, user }) => {
    
    if (auth) {
        return <Redirect to="/stocklist" />
    }

    return (
        <div>
            <img className="login" src="https://www.elsetge.cat/myimg/f/160-1606133_financial-graph-on-technology-abstract-background-picture-stock.jpg" alt="background"></img>
            <div className="mask rgba-gradient align-items-center login-div">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-xl-5 mt-xl-5">
                            <MDBAnimation type="fadeInUp" delay="1.5s">
                                <form className="text-center border border-light p-5 fr" onSubmit={onSubmit}>
                                    <div style={{ padding: "5rem 0" }}>
                                        <p className="h4 mb-4">Sign in</p>

                                        <input value={user.email} onChange={(e) => handleEmail(e)} type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" required/>
                                        <input value={user.password} onChange={(e) => handlePassword(e)} type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" required />

                                        <div className="d-flex justify-content-around">
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                                                    <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>
                                    </div>

                                </form>
                            </MDBAnimation>
                        </div>
                        <div className="col-md-6 white-text text-center">
                            <MDBAnimation type="fadeInLeft"
                                delay=".3s"
                            >
                                <h1 className="h1-responsive font-weight-bold mt-sm-5">Login now for exclusive data</h1>
                            </MDBAnimation>

                            <hr className="hr-dark" />
                            <MDBAnimation type="fadeIn" delay=".5s">
                                <h4 className="mb-4">Upgrade now to premium for more advance API</h4>
                            </MDBAnimation>

                            <div className="view overlay zoom">
                                <MDBAnimation type="bounceInDown" delay="1s">
                                    <img src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png" alt="mobile" className="img-fluid" />
                                </MDBAnimation>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;