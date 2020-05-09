import React from "react";
import "./Register.css";
import { MDBAnimation } from "mdbreact";
import { Redirect } from "react-router-dom";

const Register = ({
  onSubmit,
  handleName,
  handleEmail,
  handlePassword,
  register,
  user,
  auth,
}) => {
  if (auth || register) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <img
        className="register"
        src="https://www.elsetge.cat/myimg/f/160-1606133_financial-graph-on-technology-abstract-background-picture-stock.jpg"
        alt="background"
      ></img>
      <div className="mask rgba-gradient align-items-center register-div">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 white-text text-center">
              <MDBAnimation type="fadeInLeft" delay=".3s">
                <h1 className="h1-responsive font-weight-bold mt-sm-5">
                  Welcome to my StockAPI website
                </h1>
              </MDBAnimation>

              <hr className="hr-dark" />
              <MDBAnimation type="fadeIn" delay=".5s">
                <h4 className="mb-4">
                  Register now for premium access to real-time stock data
                </h4>
              </MDBAnimation>

              <div className="view overlay zoom">
                <MDBAnimation type="bounceInDown" delay="1s">
                  <img
                    src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                    alt="mobile"
                    className="img-fluid"
                  />
                </MDBAnimation>
              </div>
            </div>
            <div className="col-md-6 col-xl-5 mt-xl-5">
              <MDBAnimation type="fadeInRight" delay="1.5s">
                <form
                  className="text-center border border-light p-5 fr"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <p className="h4 mb-4">Sign up</p>

                  <div className="form-row mb-4">
                    <div className="col">
                      <input
                        type="text"
                        value={user.name}
                        id="defaultRegisterFormFirstName"
                        onChange={(e) => handleName(e)}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <input
                    type="email"
                    value={user.email}
                    id="defaultRegisterFormEmail"
                    onChange={(e) => handleEmail(e)}
                    className="form-control mb-4"
                    placeholder="E-mail"
                    required
                  />

                  <input
                    type="password"
                    value={user.password}
                    id="defaultRegisterFormPassword"
                    onChange={(e) => handlePassword(e)}
                    className="form-control"
                    placeholder="Password"
                    aria-describedby="defaultRegisterFormPasswordHelpBlock"
                    required
                  />

                  <br />

                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultRegisterFormNewsletter"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="defaultRegisterFormNewsletter"
                    >
                      Subscribe to our newsletter
                    </label>
                  </div>

                  <button className="btn btn-info my-4 btn-block" type="submit">
                    Sign Up
                  </button>

                  {/* <p>or sign up with:</p>

                  <a href="#" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text"></i></a>
                  <a href="#" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text"></i></a>
                  <a href="#" className="mx-2" role="button"><i className="fab fa-linkedin-in light-blue-text"></i></a>
                  <a href="#" className="mx-2" role="button"><i className="fab fa-github light-blue-text"></i></a> */}

                  <hr />
                  {/* <p>By clicking Sign up you argree to
                      <a href="" target="_blank">terms of service</a>
                  </p> */}
                </form>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
