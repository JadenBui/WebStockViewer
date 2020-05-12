import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer, MDBAnimation, MDBBadge } from "mdbreact";

const Chart = ({ chartData }) => {
  const [option, setOption] = useState("");
  const data = [
    {
      label: "Open",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "#22ffcf00",
      borderColor: "blue",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: chartData.map((data) => data.open),
    },
    {
      label: "Close",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "#22ffcf00",
      borderColor: "hotpink",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: chartData.map((data) => data.close),
    },
    {
      label: "High",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "#22ffcf00",
      borderColor: "green",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: chartData.map((data) => data.high),
    },
    {
      label: "Low",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "#22ffcf00",
      borderColor: "purple",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: chartData.map((data) => data.low),
    },
  ];
  const chart = {
    dataLine: {
      labels: chartData.map((data) =>
        new Date(data.timestamp).toLocaleDateString()
      ),
      datasets: data.filter(
        (data) => data.label.toLocaleLowerCase().indexOf(option) !== -1
      ),
    },
  };

  const onSelect = (e) => {
    const choice = e.target[e.target.selectedIndex].value;
    setOption(choice);
  };

  return (
    <MDBContainer>
      <MDBAnimation type="fadeInUp" duration="2s">
        <MDBBadge className="badge" color="blue-gradient"><h2>SELECT KEY DATA</h2></MDBBadge>
        <select
          onChange={onSelect}
          defaultValue="0"
          className="browser-default custom-select"
        >
          <option disabled value="0">
            Choose your option
          </option>
          <option value="">All</option>
          <option value="high">High Price</option>
          <option value="low">Low Price</option>
          <option value="open">Open Price</option>
          <option value="close">Close Price</option>
        </select>
        <div style={{ background: "rgba(255, 255, 255, 0.938)" }}>
          <h3 className="mt-5">Line chart</h3>
          <Line data={chart.dataLine} options={{ responsive: true }} />
        </div>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default Chart;
