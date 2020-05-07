import React, { useState, useEffect } from 'react'
import Stocks from '../StockType/Stocks/Stocks'
import Stock from '../StockType/Stock/Stock'
import ApiGetter from '../../Api/ApiGetter'
import './StockTable.css'
import BackDrop from '../../Hox/BackDrop/BackDrop'
import axios from 'axios'
import { MDBCard, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon } from 'mdbreact'

const StockTable = ({user}) => {
  const [url, setUrl] = useState({ url: "symbols", err: true });
  const [data, loading, error] = ApiGetter(url.url);
  const [stockData, setData] = useState(null);
  const [chart, setChart] = useState({ dataLine: null});

  useEffect(()=>{
    setData(data);
  },[data])

  let display =
    <BackDrop show>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </BackDrop>

  //Filtering stocks in Stocks.js

  const handleChange = async (e) => {
    if (e.target.value === "") return setData(data);
    try {
      const response = await axios.get(`http://131.181.190.87:3000/stocks/symbols?industry=${e.target.value}`);
      setData(response.data);
    } catch (e) {
      setData([]);
    }
  }

  const handleChangeClient = (e) =>{
    const filterdData = data.filter(data => data.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setData(filterdData);
  }

  const handleSelect = async (e) => {
    if (e.target[e.target.selectedIndex].value === "all") {
      return setData(data);
    }
    try {
      const query = e.target[e.target.selectedIndex].value.replace(" ", "%20")
      const response = await axios.get(`http://131.181.190.87:3000/stocks/symbols?industry=${query}`)
      setData(response.data)
    } catch (e) {
      console.log(e.message)
    }

  }
  
  //Handle Stock.js
  const handleClick = (data) => {
    setUrl({ ...url, url: `${data}` });
  }

  const handleReturn = () => {
    setChart({ dataLine: null});
    setUrl({ ...url, url: 'symbols' });
  }

  const handleSearch = async (date) => {
    const token = localStorage.getItem('token')
    try{
      const data = await axios({
        method: 'get',
        headers:{'Authorization':`Bearer ${token}`},
        url: `http://131.181.190.87:3000/stocks/authed/${url.url}?from=${date.from}&to=${date.to}`
        })
      const chartData = data.data;
      setChart({dataLine:chartData});
      console.log(chartData);
    }catch(e){
      console.log(e.message);
    }
  }

  //const refetch = () => setUrl({...url,err:true})
  //Close the BackDrop
  const confirmHandler = () => setUrl({ ...url, err: false });

  if (!loading) {
    error ? display =
      <div>
        <BackDrop show={url.err} clickHandler={confirmHandler}>
          <h1 className="alert-danger message">
            Fetching data was not succes : {error.message}
          </h1>
        </BackDrop>
        <div className="errorDisplay">
          <MDBCard className="card-body">
            <MDBCardTitle>An Error Have Occured</MDBCardTitle>
            <MDBCardText>
              Please try again
         </MDBCardText>
            <MDBBtn gradient="young-passion" style={{ width: "20%", margin: "auto" }}><MDBIcon icon="undo" /></MDBBtn>
          </MDBCard>
        </div>
      </div>

      : display = data.length > 1 ? 
      <Stocks showFilter stockData={stockData} handleChange={handleChange} handleChangeClient={handleChangeClient} 
      handleSelect={handleSelect} onClick={handleClick} />
      : <Stock chartData={chart.dataLine} data={data} user={user} onClick={handleReturn} onSearch={handleSearch} />
  }

  return (
    <React.Fragment>
      {display}
    </React.Fragment>
  )

}



export default StockTable;