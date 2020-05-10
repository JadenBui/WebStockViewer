import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import './DateSelector.css'

import "react-datepicker/dist/react-datepicker.css";
import { MDBBtn } from 'mdbreact';
const DateSelector = ({onSearch}) => {
  const [date, setDate] = useState({from:new Date(),to:new Date()});

  const handleFrom = (date) => setDate(preV=>{return{to : preV.to,from:date}});
  const handleTo = (date) => setDate(preV=>{return{from : preV.from,to:date}});

  const handleSearch = () =>{
    const parsedDate = {from:date.from.toISOString().replace(/:/g,"%3A"), to:date.to.toISOString().replace(/:/g,"%3A")}
    onSearch(parsedDate)
  }

  return (
    <div className="dateSelector">
      <div className="inline">
      <DatePicker
        selected={date.from}
        onChange={handleFrom}
      />
      </div>
      <div className="inline">
      <DatePicker
        selected={date.to}
        onChange={handleTo}
      />
      </div>

      <div className="inline">
      <MDBBtn gradient="blue" className="search" onClick={handleSearch} style={{display:"block",margin:"2rem auto"}}>Search</MDBBtn>
      </div>
      
    </div>
  );
}

export default DateSelector;