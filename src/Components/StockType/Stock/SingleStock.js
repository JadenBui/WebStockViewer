import React, { useState, useEffect } from "react";
import "./Stock.css";
import "../Stocks/Stocks.css";
import { MDBBtn, MDBAnimation, MDBAlert, MDBBadge } from "mdbreact";
import DateSelector from "../../DateSelector/DateSelector";
import Chart from "../../Chart/Chart";
import Stocks from "../Stocks/Stocks";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiGetter from "../../../Api/ApiGetter";
import BackDrop from "../../../Hox/BackDrop/BackDrop";
import ErrorHandler from "../../../Hox/ErrorHandler/ErrorHandler";
import Table from "../../Table/Table";

const SingleStock = ({ onSearch, user, match }) => {
  const symbol = match.match.params.symbol;
  const [data, loading, error] = ApiGetter(symbol);
  const [stock, setStock] = useState({ data: null, err: true });
  const [chartData, setChart] = useState({ dataLine: null });

  const dataParse = {
    ...stock.data,
    timestamp: new Date(data.timestamp).toDateString(),
  };
  //const isAuth = user.email !== "";
  const isAuth = true;

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
      console.log(e.message);
    }
  };

  useEffect(() => {
    setStock({ ...stock, data: data });
  }, [data]);

  const confirmHandler = () => setStock({ ...data, err: false });

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
    return <ErrorHandler show={stock.err} clickHandler={confirmHandler} />;
  }

  return (
    <div className="stock-page">
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
            <div className="stock-table">
              <Table
                onClick={() => void 0}
                className={"ag-theme-alpine-dark stocks-stock"}
                colSize={135}
                stockData={chartData.dataLine.map((data) => {
                  return {
                    timestamp: new Date(data.timestamp).toDateString(),
                    open: data.open,
                    high: data.high,
                    low: data.low,
                    close: data.close,
                    volumes: data.volumes,
                  };
                })}
              />
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
