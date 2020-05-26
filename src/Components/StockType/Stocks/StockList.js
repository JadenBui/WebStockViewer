import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import ErrorHandler from "../../../Hox/ErrorHandler/ErrorHandler";
import axios from "axios";
import ApiGetter from "../../../Api/ApiGetter";
import BackDrop from "../../../Hox/BackDrop/BackDrop";
import { MDBAnimation, MDBCol, MDBRow } from "mdbreact";
import SelectBar from "../../SelectBar/SelectBar";
import "../Stocks/Stocks.css";
import { useHistory } from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon } from "mdbreact";

const EMPTY_STRING = "";
const axios_stock = axios.create({
  baseURL: 'http://131.181.190.87:3000/stocks',
});

const StockList = () => {
  const [data, loading, error] = ApiGetter("symbols");
  const [stockList, setStockList] = useState(null);
  const [err, setErr] = useState({ show: false, message: EMPTY_STRING });
  const history = useHistory();
  useEffect(() => {
    setStockList(data);
  }, [data]);

  const onClick = (symbol) => {
    history.push(`/stocklist/stock/${symbol}`);
  };


  //server-side filtering
  const handleChange = async (e) => {
    const stockIndustry = e.target.value;
    if (stockIndustry === EMPTY_STRING) return setStockList(data);
    try {
      const response = await axios_stock.get(
        `symbols?industry=${stockIndustry}`
      );
      setStockList(response.data);
    } catch (e) {
      setStockList([]);
    }
  };

  const handleSelect = async (e) => {
    const selectedIndustry = e.target[e.target.selectedIndex].value;
    if (selectedIndustry === "all") {
      return setStockList(data);
    }
    try {
      const parsedIndustry = encodeURIComponent(selectedIndustry);
      const response = await axios_stock.get(
        `symbols?industry=${parsedIndustry}`
      );
      setStockList(response.data);
    } catch (e) {
      setErr({ show: true, message: "Cannot select" });
    }
  };

  //client-side filtering
  const handleChangeClientName = (e) => {
    const stockName = e.target.value;
    const filteredData = data.filter(
      (data) =>
        data.name.toLowerCase().indexOf(stockName.toLowerCase()) !== -1
    );
    setStockList(filteredData);
  };

  const handleChangeClientSymbol = (e) => {
    const stockSymbol = e.target.value;
    if(stockSymbol === "") return setStockList(data);
    const filteredData = data.filter(
      (data) =>
        data.symbol.toLowerCase() === stockSymbol.toLowerCase()
    );
    setStockList(filteredData);
  };

  
  //close warning backdrop
  const confirmError = () => setErr({ show: false, message: EMPTY_STRING });

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
    <div className="stocks-page">
      <ErrorHandler
        error={err.show}
        confirmHandler={confirmError}
        message={err.message}
      />
      <MDBAnimation type="fadeIn" duration="0.8s">
        <MDBRow center>
          <MDBCol md="2" middle className="optionrow">
            <form className="form-inline mt-4 mb-4">
              <label className="badge"><MDBIcon icon="search" /> Select Industry </label>
              <SelectBar onSelect={handleSelect} />
            </form>

            <form className="form-inline mt-4 mb-4">
              <label className="badge"><MDBIcon icon="file-signature" />Filter By Name</label>
              <input
                onChange={handleChangeClientName}
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="FilterByName"
                aria-label="Search"
              />
              <label className="badge"><MDBIcon fab icon="sketch" />Filter By Symbol</label>
              <input
                onChange={handleChangeClientSymbol}
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="FilterBySymbol"
                aria-label="Search"
              />
              <label className="badge"><MDBIcon icon="industry" />Filter By Industry</label>
              <input
                onChange={handleChange}
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="FilterByIndustry"
                aria-label="Search"
              />
            </form>
          </MDBCol>

          <Table
            stockData={stockList}
            onClick={onClick}
            className={"ag-theme-alpine-dark stocks"}
            colSize={196}
          />
        </MDBRow>
      </MDBAnimation>
    </div>
  );
};
export default StockList;
