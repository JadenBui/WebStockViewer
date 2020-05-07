import React from 'react'
import { Label, Table } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
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
                    {dataParse.name ? <MDBBadge className="badge" color="morpheus-den-gradient"><h3>{dataParse.name.toUpperCase()} ( {dataParse.symbol.toUpperCase()} )</h3></MDBBadge> : null}
                    {isAuth ? <DatePicker onSearch={onSearch} /> :
                        <MDBAlert color="success">
                            You haven't login. Click <Link to="/login">here</Link> to login.
                        </MDBAlert>}
                    {chartData ?
                        <div className="stock-table">
                            <Stocks onClick={(e) => console.log(e)}
                                stockData={chartData.map(data => { return { timestamp: new Date(data.timestamp).toDateString(), open: data.open, high: data.high, low: data.low, close: data.close, volumes: data.volumes } })} />
                        </div>
                        :
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    {Object.keys(data).map((headers) => <Table.HeaderCell key={uuidv4()}>
                                        {headers.charAt(0).toUpperCase() + headers.slice(1)}</Table.HeaderCell>)}
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    {Object.values(dataParse).map((values) =>
                                        <Table.Cell className="lable" key={uuidv4()}>
                                            <Label>{values}</Label>
                                        </Table.Cell>)}
                                </Table.Row>
                            </Table.Body>
                        </Table>}
                    <div className="chart">
                        {chartData ? <Chart chartData={chartData} /> : null}
                    </div>
                    <MDBAnimation type="fadeIn" delay="0.5s">
                        <div style={{ marginTop: "3.5rem" }}>
                            <MDBBtn gradient="morpheus-den" onClick={onClick}>RETURN</MDBBtn>
                        </div>
                    </MDBAnimation>
                </div>
            </MDBAnimation>


        </div>
    )
}

export default Stock;