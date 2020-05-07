import React from 'react'
import './Stock.css'
import { MDBBtn, MDBAnimation, MDBAlert, MDBBadge } from 'mdbreact'
import DatePicker from '../../DateSelector/DateSelector'
import Chart from '../../Chart/Chart'
import Stocks from '../Stocks/Stocks'
import { Link } from 'react-router-dom'

const Stock = ({ data, chartData, user, onClick, onSearch }) => {

    const dataParse = { ...data, timestamp: new Date(data.timestamp).toDateString() }
    const isAuth = user.email !== "";

    return (
        <div className="stock-page">
            <MDBAnimation type="slideInDown" duration="0.5s">
                <div className="stock">
                    {dataParse.name ? <MDBBadge className="badge" color="blue-gradient"><h2>{dataParse.name.toUpperCase()} ( {dataParse.symbol.toUpperCase()} )</h2></MDBBadge> : null}
                    {isAuth ? <DatePicker onSearch={onSearch} /> :
                        <MDBAlert color="success" className="lable">
                            You haven't login. Click <Link to="/login"><p>HERE</p></Link> to login.
                        </MDBAlert>}
                    {chartData ?
                        <div className="stock-table">
                            <Stocks onClick={() => void 0} className={"ag-theme-alpine-dark stocks-stock"} colSize={135}
                                stockData={chartData.map(data => { return { timestamp: new Date(data.timestamp).toDateString(), open: data.open, high: data.high, low: data.low, close: data.close, volumes: data.volumes } })} />
                        </div>
                        :
                        <Stocks onClick={() => void 0} className={"ag-theme-alpine-dark stocks-single"} colSize={135}
                            stockData={[dataParse].map((data) => { return { date: data.timestamp, open: data.open, high: data.high, low: data.low, close: data.close, volumes: data.volumes } })} />}
                    <div className="chart">
                        {chartData ? <Chart chartData={chartData} /> : null}
                    </div>
                    <MDBAnimation type="fadeIn" delay="0.5s">
                        <MDBBtn gradient="morpheus-den" onClick={onClick}>RETURN</MDBBtn>
                    </MDBAnimation>
                </div>
            </MDBAnimation>


        </div>
    )
}

export default Stock;