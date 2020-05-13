import React from "react";
import "./Home.css";
import data from "../../assets/images/data.jpeg";
import programming from "../../assets/images/programming.jpeg";
import stock from "../../assets/images/stock.jpeg";
import singleCard from "../../assets/images/singleCard.jpg";

import {
  MDBAnimation,
  MDBCarouselCaption,
  MDBMask,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBView,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-div">
      <MDBAnimation type="fadeIn" duration="1s">
        <div className="home view">
          <div className="align-items-center">
            <div className="container px-md-3 px-sm-0">
              <div className="row home-row">
                <div className="col-md-12 mb-4 white-text text-center title">
                  <h1>Real Time Stocks Data</h1>
                </div>
                <div className="col-md-12 mb-4 white-text text-center title">
                  <h5 className=" mt-2 mb-4">Welcome to JD Stocks</h5>
                </div>
                <div className="col-md-12 mb-4 white-text text-center title">
                  <Link to="/stocklist">
                    <MDBBtn rounded gradient="blue">
                      Find out more
                    </MDBBtn>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBAnimation>

      <div className="morpheus-den-gradient section">
        <MDBRow center>
          <MDBAnimation type="slideInLeft" duration="0.8s">
            <MDBCol md="auto">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2821%29.jpg')",
                }}
              >
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <div>
                    <h5 className="blue-text">
                      <MDBIcon icon="desktop" /> Software
                    </h5>
                    <MDBCardTitle tag="h3" className="pt-2">
                      <strong>Build with the latest technology</strong>
                    </MDBCardTitle>
                    <p>
                      By using the MEAN stack, I've produced a dynamic website
                    </p>
                    <MDBBtn color="blue">
                      <MDBIcon icon="clone left" /> See More
                    </MDBBtn>
                  </div>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBAnimation>

          <MDBAnimation type="fadeIn" delay="1s" duration="0.8s">
            <MDBCol md="auto">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url('https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg')",
                }}
              >
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <div>
                    <h5 className="blue-text">
                      <MDBIcon icon="check-circle" /> Use With Ease
                    </h5>
                    <MDBCardTitle tag="h3" className="pt-2">
                      <strong>Modest Design For Simplicity</strong>
                    </MDBCardTitle>
                    <p>
                      Navigate through the website couldn't be more simple with
                      us
                    </p>
                    <MDBBtn color="blue">
                      <MDBIcon icon="clone left" /> See More
                    </MDBBtn>
                  </div>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBAnimation>

          <MDBAnimation type="fadeInRight" duration="0.8s">
            <MDBCol md="auto">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg')",
                }}
              >
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <div>
                    <h5 className="blue-text">
                      <MDBIcon icon="shield-alt" /> Secure
                    </h5>
                    <MDBCardTitle tag="h3" className="pt-2">
                      <strong>Leading Encryption Industry</strong>
                    </MDBCardTitle>
                    <p>
                      All of the sensitive information is encrypted totally
                      secure
                    </p>
                    <MDBBtn color="blue">
                      <MDBIcon icon="clone left" /> See More
                    </MDBBtn>
                  </div>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBAnimation>
        </MDBRow>
        <MDBAnimation type="fadeInUp" delay="2s">
          <div style={{ marginTop: "3rem" }}>
            <MDBRow center>
              <MDBCol style={{ maxWidth: "60rem" }}>
                <MDBCard reverse>
                  <MDBCardImage
                    cascade
                    style={{ height: "20rem", width: "60rem" }}
                    src={singleCard}
                  />
                  <MDBCardBody cascade className="text-center">
                    <MDBCardTitle>Our Mission</MDBCardTitle>
                    <h5 className="indigo-text">
                      <strong>Stocks Website</strong>
                    </h5>
                    <MDBCardText>
                      We aim to be the top noch on website about stocks
                    </MDBCardText>
                    <a href="#!" className="icons-sm li-ic ml-1">
                      <MDBIcon fab icon="linkedin-in" />
                    </a>
                    <a href="#!" className="icons-sm tw-ic ml-1">
                      <MDBIcon fab icon="twitter" />
                    </a>
                    <a href="#!" className="icons-sm fb-ic ml-1">
                      <MDBIcon fab icon="facebook-f" />
                    </a>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBAnimation>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className="z-depth-1 carousel"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img className="d-block w-100" src={data} alt="First slide" />
                <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption className="caro-caption">
                <h3 className="h3-responsive">Efficient</h3>
                <p>Made to perform fast</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src={programming}
                  alt="Second slide"
                />
              </MDBView>
              <MDBCarouselCaption className="caro-caption">
                <h3 className="h3-responsive">Secure</h3>
                <p>Edge to edge encrytion</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img className="d-block w-100" src={stock} alt="Third slide" />
              </MDBView>
              <MDBCarouselCaption className="caro-caption">
                <h3 className="h3-responsive">Easy to use</h3>
                <p>Simple design</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </div>
    </div>
  );
};

export default Home;
