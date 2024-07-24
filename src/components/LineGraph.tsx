import "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";

interface LineGraphProps {
  data: {
    cases: {
      [date: string]: number;
    };
  };
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        borderColor: "black",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} width={"100%"} height={"100%"} />;
};

export default LineGraph;
