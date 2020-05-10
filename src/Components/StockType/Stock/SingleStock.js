import React, { useState, useEffect } from "react";
import "./Stock.css";
import "../Stocks/Stocks.css";
import { MDBBtn, MDBAnimation, MDBAlert, MDBBadge } from "mdbreact";
import DateSelector from "../../DateSelector/DateSelector";
import Chart from "../../Chart/Chart";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiGetter from "../../../Api/ApiGetter";
import BackDrop from "../../../Hox/BackDrop/BackDrop";
import ErrorHandler from "../../../Hox/ErrorHandler/ErrorHandler";
import Table from "../../Table/Table";

const SingleStock = ({ auth, match }) => {
  const symbol = match.match.params.symbol;
  const [data, loading, error] = ApiGetter(symbol);
  const [stock, setStock] = useState(null);
  const [err,setErr] = useState({show:false,message:""});
  const [chartData, setChart] = useState({ dataLine: null });

  useEffect(() => {
    setStock(data);
  }, [data]);

  const dataParse = {
    ...stock,
    timestamp: new Date(data.timestamp).toLocaleDateString(),
  };

  const isAuth = auth;

  const handleSearch = async (date) => {
    const token = localStorage.getItem("token");
    try {
      const data = await axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
        url: `http://131.181.190.87:3000/stocks/authed/${symbol}?from=${date.from}&to=${date.to}`,
      });
      const chartData = data.data;
      setChart({ dataLine: chartData });
    } catch (e) {
      setErr({show:true,message:"Sorry, we haven't got data for this time"});
    }
  };

  
  const confirmHandler = () => setErr({show:false,message:""});

  if (loading) {
    return (
      <BackDrop show>
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </BackDrop>
    );
  }

  if (error) {
    setErr({show:true,message:"Could not connect to the server"});
  }

  return (
    <div className="stock-page">
      <ErrorHandler error={err.show} confirmHandler={confirmHandler} message={err.message}/>
      <MDBAnimation type="slideInDown" duration="0.5s">
        <div className="stock">
          {dataParse.name ? (
            <MDBBadge className="badge" color="blue-gradient">
              <h2>
                {dataParse.name.toUpperCase()} ({dataParse.symbol.toUpperCase()}
                )
              </h2>
            </MDBBadge>
          ) : null}
          {isAuth ? (
            <DateSelector onSearch={handleSearch} />
          ) : (
            <MDBAlert color="success" className="lable">
              You haven't login. Click
              <Link to="/login">
                <p> HERE </p>
              </Link>
              to login.
            </MDBAlert>
          )}
          {chartData.dataLine ? (
            <div className="stocks-page">
            <MDBAnimation type="bounce" duration="0.8s">
              <Table
                onClick={() => void 0}
                className={"ag-theme-alpine-dark stocks-stock"}
                colSize={135}
                stockData={chartData.dataLine.map((data) => {
                  return {
                    timestamp: new Date(data.timestamp).toLocaleDateString(),
                    open: data.open,
                    high: data.high,
                    low: data.low,
                    close: data.close,
                    volumes: data.volumes,
                  };
                })}
              />
              </MDBAnimation>
            </div>
          ) : (
            <div className="stocks-page">
              <Table
                onClick={() => void 0}
                className={"ag-theme-alpine-dark stocks-single"}
                colSize={135}
                stockData={[dataParse].map((data) => {
                  return {
                    date: data.timestamp,
                    open: data.open,
                    high: data.high,
                    low: data.low,
                    close: data.close,
                    volumes: data.volumes,
                  };
                })}
              />
            </div>
          )}
          <div className="chart">
            {chartData.dataLine ? (
              <Chart chartData={chartData.dataLine} />
            ) : null}
          </div>
          <MDBAnimation type="fadeIn" delay="0.5s">
            <Link to="/stocklist">
              <MDBBtn gradient="morpheus-den">RETURN</MDBBtn>
            </Link>
          </MDBAnimation>
        </div>
      </MDBAnimation>
    </div>
  );
};

export default SingleStock;
