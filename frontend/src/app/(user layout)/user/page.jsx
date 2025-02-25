"use client"
import React, { useState } from 'react';
import { Chart } from "react-google-charts";

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = [
    ["Price", "Size"],
    [1, 8], [2, 5.5], [3, 4], [4, 9]
  ]
  const options = {
    title: "Last results and improvements",
    titleTextStyle: { color: "#fff" },
    curveType: "function",
    backgroundColor: "black",
    colors: ["red"],
    hAxis: {
      gridlines: { color: "transparent" }, ticks: [], titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" }
    },
    vAxis: {
      viewWindow: { max: 9.5, min: 0 }, gridlines: { color: "transparent" }, titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" }
    },
    legend: "none"
  }
  return <>
    <div className={`content ${sidebarOpen ? "blurred" : ""}`}>
      <div style={{ width: "1300px", height: "500px", border: "2px solid black", borderRadius: "20px", overFlow: "hidden", background: "black", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px" }} className='chart'>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
      <div className="sub-tables">
        <table className='freetst-table'>
          <thead className='freetst-thead'>
            <tr className='freetst-tr'>
              <th className='freetst-th'>Upcoming tests</th>
              <th className='freetst-th'></th>
            </tr>
          </thead>
          <tbody className='freetst-tbody'>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 1</td>
              <td className='freetst-td right'>
                <button>Join</button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='freetst-table'>
          <thead className='freetst-thead'>
            <tr className='freetst-tr'>
              <th className='freetst-th'>Last results</th>
              <th className='freetst-th'></th>
            </tr>
          </thead>
          <tbody className='freetst-tbody'>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number named</td>
              <td className='freetst-td right'>
                <p>7.5 points</p>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </>

};

export default User;