import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham.css"
import './Stocks.css'
import { MDBAnimation, MDBCol, MDBIcon, MDBRow } from "mdbreact";
import SelectBar from '../../SelectBar/SelectBar'

const Stocks = ({ stockData, onClick, handleChange, handleSelect, showFilter, handleChangeClient }) => {

    const valid = stockData[0] !== undefined;
   
    let headers = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Symbol", field: "symbol", sortable: true, filter: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true }
    ]
    if(valid){
        headers = Object.keys(stockData[0])
        .map(headerName => 
            { return { headerName: headerName.charAt(0).toUpperCase() + headerName.slice(1), field: headerName, sortable: true, filter: true } })
            
    }
   
    return (
        <div className="stocks-page">
           {
               showFilter ?  <MDBRow center>
                <MDBCol md="auto" middle >
                    <form className="form-inline mt-4 mb-4">
                        <MDBIcon icon="search" />
                        <input onChange={handleChangeClient} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="SearchByName" aria-label="Search" />
                    </form>
                </MDBCol>
                <MDBCol md="auto" middle >
                    <form className="form-inline mt-4 mb-4">
                        <MDBIcon icon="search" />
                        <input onChange={handleChange} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="SearchByIndustry" aria-label="Search" />
                    </form>
                </MDBCol>
                <MDBCol md="2" middle>
                    <SelectBar onSelect={handleSelect} />
                </MDBCol>
            </MDBRow> : null
           }

            <MDBAnimation type="bounce" duration="0.8s">
                <div className="ag-theme-balham stocks">
                    <AgGridReact columnDefs={headers} onRowClicked={(row) => onClick(row.data.symbol)} rowData={valid ? stockData : []} pagination={true} paginationPageSize={20} />
                </div>
            </MDBAnimation>
        </div>
    )
}

export default Stocks;
