import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import ErrorHandler from "../../../Hox/ErrorHandler/ErrorHandler";
import axios from 'axios'
import ApiGetter from '../../../Api/ApiGetter'
import BackDrop from '../../../Hox/BackDrop/BackDrop'
import { MDBAnimation, MDBCol, MDBRow } from "mdbreact";
import SelectBar from '../../SelectBar/SelectBar'
import '../Stocks/Stocks.css'
import { Redirect, useHistory } from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon } from "mdbreact";




const StockList = () => {
  const [data, loading, error] = ApiGetter("symbols");
  const [stockList, setStockList] = useState({ data: null, err: true });
  const history = useHistory();
  useEffect(() => {
    setStockList({ ...stockList, data: data });
  }, [data]);

  const onClick = (symbol) =>{
      console.log(symbol)
      history.push(`/stock/${symbol}`);
  }

  const handleChange = async (e) => {
    if (e.target.value === "") return setStockList({...stockList,data:data});
    try {
      const response = await axios.get(
        `http://131.181.190.87:3000/stocks/symbols?industry=${e.target.value}`
      );
      setStockList({...stockList,data:response.data});
    } catch (e) {
      setStockList({...stockList,data:[]});
    }
  };

  const handleChangeClient = (e) => {
    const filterdData = data.filter(
      (data) =>
        data.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setStockList({...stockList,data:filterdData});
  };

  const handleSelect = async (e) => {
    if (e.target[e.target.selectedIndex].value === "all") {
      return setStockList({...stockList,data:data});
    }
    try {
      const query = e.target[e.target.selectedIndex].value.replace(" ", "%20");
      const response = await axios.get(
        `http://131.181.190.87:3000/stocks/symbols?industry=${query}`
      );
      setStockList({...stockList,data:response.data});
    } catch (e) {
      console.log(e.message);
    }
  };

  const confirmHandler = () => setStockList({ ...data, err: false });

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
        <ErrorHandler error={stockList.err} confirmHandler={confirmHandler} />
        <div className="errorDisplay">
          <MDBCard className="card-body">
            <MDBCardTitle>An Error Have Occured</MDBCardTitle>
            <MDBCardText>Please try again</MDBCardText>
            <MDBBtn
              gradient="young-passion"
              style={{ width: "20%", margin: "auto" }}
            >
              <MDBIcon icon="undo" />
            </MDBBtn>
          </MDBCard>
        </div>
    </div>);
  }

  return (
    <div className="stocks-page">
      <MDBAnimation type="fadeInDown" duration="0.8s">
      <MDBRow center>
        <MDBCol md="auto" middle>
          <form className="form-inline mt-4 mb-4">
            <input
              onChange={handleChangeClient}
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder="SearchByName"
              aria-label="Search"
            />
          </form>
        </MDBCol>
        <MDBCol md="auto" middle>
          <form className="form-inline mt-4 mb-4">
            <input
              onChange={handleChange}
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder="SearchByIndustry"
              aria-label="Search"
            />
          </form>
        </MDBCol>
        <MDBCol md="2" middle>
          <SelectBar onSelect={handleSelect} />
        </MDBCol>
      </MDBRow>
      </MDBAnimation>
      <Table stockData={stockList.data} onClick={onClick} className={"ag-theme-alpine-dark stocks"} colSize={196} />
    </div>
  );
};
export default StockList;
