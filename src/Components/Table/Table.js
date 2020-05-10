import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "../StockType/Stocks/Stocks.css";
import { MDBAnimation } from "mdbreact";

const Table = ({ stockData, className, colSize, onClick }) => {
  const valid = stockData[0] !== undefined;

  let headers = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: true },
    { headerName: "Industry", field: "industry", sortable: true, filter: true },
  ];

  if (valid) {
    headers = Object.keys(stockData[0]).map((headerName) => {
      return {
        headerName: headerName.charAt(0).toUpperCase() + headerName.slice(1),
        field: headerName,
        sortable: colSize > 150 ? true : false,
        filter: colSize > 150 ? true : false,
        width: colSize,
      };
    });
  }

  return (
    <MDBAnimation type="bounce" duration="0.8s">
      <div className={className}>
        <AgGridReact
          columnDefs={headers}
          onRowClicked={(row) => onClick(row.data.symbol)}
          rowData={valid ? stockData : []}
          pagination={colSize > 150 ? true : false}
          paginationPageSize={20}
        />
      </div>
    </MDBAnimation>
  );
};

export default Table;
