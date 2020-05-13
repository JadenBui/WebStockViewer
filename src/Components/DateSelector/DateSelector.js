import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DateSelector.css";

import "react-datepicker/dist/react-datepicker.css";
import { MDBBtn } from "mdbreact";
const DateSelector = ({ onSearch }) => {
  const [date, setDate] = useState({ from: new Date(), to: new Date() });

  //Handle date selection
  const handleFromDate = (date) =>
    setDate((preV) => {
      return { to: preV.to, from: date };
    });

  const handleToDate = (date) =>
    setDate((preV) => {
      return { from: preV.from, to: date };
    });

  //Passing data on to parent component  
  const handleSearch = () => {
    const parsedDate = {
      from: encodeURIComponent(date.from.toISOString()),
      to: encodeURIComponent(date.to.toISOString()),
    };
    onSearch(parsedDate);
  };

  return (
    <div className="dateSelector">
      <div className="inline">
        <DatePicker selected={date.from} onChange={handleFromDate} />
      </div>
      <div className="inline">
        <DatePicker selected={date.to} onChange={handleToDate} />
      </div>

      <div className="inline">
        <MDBBtn
          gradient="blue"
          className="search"
          onClick={handleSearch}
          style={{ display: "block", margin: "2rem auto" }}
        >
          Search
        </MDBBtn>
      </div>
    </div>
  );
};

export default DateSelector;
