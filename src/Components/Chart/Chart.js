import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer, MDBAnimation } from "mdbreact";

const Chart = ({ chartData }) => {
  const chart = {
    dataLine: {
      labels: chartData.map((data) =>
        new Date(data.timestamp).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Close Data",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
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
          data: chartData.map((data) => data.close),
        },
      ],
    },
  };

  return (
    <MDBContainer>
      <MDBAnimation type="fadeInUp" duration="2s">
        <div style={{ background: "rgba(255, 255, 255, 0.938)" }}>
          <h3 className="mt-5">Line chart</h3>
          <Line data={chart.dataLine} options={{ responsive: true }} />
        </div>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default Chart;
