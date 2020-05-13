import React, { useState, useEffect, useCallback } from "react";
import "./Stock.css";
import "../Stocks/Stocks.css";
import {
  MDBBtn,
  MDBAnimation,
  MDBAlert,
  MDBBadge,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from "mdbreact";
import DateSelector from "../../DateSelector/DateSelector";
import Chart from "../../Chart/Chart";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiGetter from "../../../Api/ApiGetter";
import BackDrop from "../../../Hox/BackDrop/BackDrop";
import ErrorHandler from "../../../Hox/ErrorHandler/ErrorHandler";
import Table from "../../Table/Table";

const EMPTY_STRING = "";

const SingleStock = ({ auth, match }) => {
  const symbol = match.match.params.symbol;
  const [data, loading, error] = ApiGetter(symbol);
  const [stock, setStock] = useState(null);
  const [err, setErr] = useState({ show: false, message: EMPTY_STRING });
  const [chartData, setChart] = useState({ dataLine: null });

  useEffect(() => {
    setStock(data);
  }, [data]);

  const dataParsed = {
    ...stock,
    timestamp: new Date(data.timestamp).toLocaleDateString(),
  };

  const handleSearch = useCallback(
    async (date) => {
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
        setErr({
          show: true,
          message: e.response.data.message,
        });
      }
    },
    [symbol]
  );
  
  //close warning backdrop
  const confirmError = () => setErr({ show: false, message: EMPTY_STRING });

  const DatePanel = useCallback(() => {
    if (auth) {
      return <DateSelector onSearch={handleSearch} />;
    }
    return (
      <MDBAlert color="success" className="lable">
        You haven't login. Click
        <Link to="/login">
          <p> HERE </p>
        </Link>
        to login.
      </MDBAlert>
    );
  }, [auth, handleSearch]);

  const StockLable = useCallback(() => {
    if (dataParsed.name) {
      return (
        <MDBBadge className="badge" color="blue-gradient">
          <h2>
            {dataParsed.name.toUpperCase()} ({dataParsed.symbol.toUpperCase()})
          </h2>
        </MDBBadge>
      );
    }
    return null;
  }, [dataParsed.name, dataParsed.symbol]);

  const StockTable = useCallback(() => {
    if (chartData.dataLine) {
      return (
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
      );
    }
    return (
      <div className="stocks-page">
        <Table
          onClick={() => void 0}
          className={"ag-theme-alpine-dark stocks-single"}
          colSize={135}
          stockData={[dataParsed].map((data) => {
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
    );
  }, [chartData.dataLine, dataParsed]);

  const DisplayChart = useCallback(() => {
    if (chartData.dataLine) {
      return (
        <Chart
          chartData={chartData.dataLine
            .map((data) => {
              return { ...data };
            })
            .reverse()}
        />
      );
    }
    return null;
  }, [chartData.dataLine]);

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
    return (
      <div>
        <div className="errorDisplay">
          <MDBCard className="card-body">
            <MDBCardTitle>An Error Have Occured</MDBCardTitle>
            <MDBCardText>Please try again</MDBCardText>
            <MDBBtn
              onClick={() => window.location.reload(false)}
              gradient="young-passion"
              style={{ width: "20%", margin: "auto" }}
            >
              <MDBIcon icon="undo" />
            </MDBBtn>
          </MDBCard>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-page">
      <ErrorHandler
        error={err.show}
        confirmHandler={confirmError}
        message={err.message}
      />
      <MDBAnimation type="fadeIn" duration="0.8s">
        <div className="stock">
          <StockLable />
          <DatePanel />
          <StockTable />
          <div className="chart">
            <DisplayChart />
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
