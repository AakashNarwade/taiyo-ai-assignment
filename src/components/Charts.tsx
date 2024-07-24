import { useCountryData, useGraphData, useWorldData } from "../api";
import React from "react";
import Map from "./Map";
import LineGraph from "./LineGraph";

const Dashboard: React.FC = () => {
  const worldDataQuery = useWorldData();
  const countryDataQuery = useCountryData();
  const graphDataQuery = useGraphData();

  if (
    worldDataQuery.isLoading ||
    countryDataQuery.isLoading ||
    graphDataQuery.isLoading
  )
    return <div>Loading...</div>;

  if (
    worldDataQuery.isError ||
    countryDataQuery.isError ||
    graphDataQuery.isError
  )
    return <div>Error fetching data</div>;

  const worldData = worldDataQuery.data;

  return (
    <div className="flex flex-col items-center w-full h-full gap-4 p-4">
      <h1 className="py-1 text-lg font-cursive">COVID-19 Dashboard</h1>

      {/* Worldwide Data Section */}
      <div className="w-full max-w-lg p-4 bg-white border-2 border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-2">Worldwide Data</h2>
        <p className="text-lg">
          Total Cases:{" "}
          <span className="font-semibold">
            {worldData.cases.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          Total Active Cases:{" "}
          <span className="font-semibold">
            {worldData.active.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          Total Recovered:{" "}
          <span className="font-semibold">
            {worldData.recovered.toLocaleString()}
          </span>
        </p>
      </div>

      <hr className="w-full border-gray-300" />

      <div className="w-full max-w-5xl border-8 border-white shadow-xl rounded-lg overflow-hidden">
        <Map countries={countryDataQuery.data} />
      </div>

      <div className="w-full max-w-3xl p-4 mb-2 border-8 border-white shadow-xl rounded-lg">
        <LineGraph data={graphDataQuery.data} />
      </div>
    </div>
  );
};

export default Dashboard;
