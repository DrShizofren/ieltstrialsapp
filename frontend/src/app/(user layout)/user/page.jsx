"use client"
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const buildChartData = (results) => {
  const base = [["Attempt", "Score"]];
  if (!Array.isArray(results) || results.length === 0) return [...base, [1, 0]];
  return [...base, ...results.map((r, i) => [i + 1, r.score])];
};

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))
  const [chartData, setChartData] = useState(() =>
    buildChartData(JSON.parse(localStorage.getItem("user"))?.results)
  );

  useEffect(() => {
    const onStorage = () => {
      const fresh = JSON.parse(localStorage.getItem("user"))
      setUserData(fresh)
      setChartData(buildChartData(fresh?.results))
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, []);

  const options = {
    title: "Score Progress",
    titleTextStyle: { color: "#0f172a", fontSize: 18, bold: true },
    curveType: "function",
    backgroundColor: "transparent",
    colors: ["#6f6fec"],
    pointSize: 6,
    lineWidth: 3,
    chartArea: { left: 50, right: 30, top: 50, bottom: 40, width: "90%", height: "75%" },
    hAxis: {
      gridlines: { color: "#e6e8f0" },
      baselineColor: "#e6e8f0",
      ticks: [],
      titleTextStyle: { color: "#64748b", fontSize: 13 },
      textStyle: { color: "#64748b", fontSize: 12 }
    },
    vAxis: {
      viewWindow: { max: 9.5, min: 0 },
      gridlines: { color: "#e6e8f0" },
      baselineColor: "#e6e8f0",
      titleTextStyle: { color: "#64748b", fontSize: 13 },
      textStyle: { color: "#64748b", fontSize: 12 }
    },
    legend: "none"
  };
  return <>
    <div className={`content ${sidebarOpen ? "blurred" : ""}`}>
      <div className="chart-card">
        <Chart
          chartType="LineChart"
          width="100%"
          height="380px"
          data={chartData}
          options={options}
        />
      </div>
      <div className="sub-tables">
        <table className='freetst-table'>
          <thead className='freetst-thead'>
            <tr className='freetst-tr'>
              <th className='freetst-th'>Upcoming tests</th>
              <th className='freetst-th'>Participate</th>
            </tr>
          </thead>
          <tbody className='freetst-tbody'>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 1</td>
              <td className='freetst-td right'>
                <button>Join</button>
              </td>
            </tr>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 2</td>
              <td className='freetst-td right'>
                <button>Join</button>
              </td>
            </tr>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 3</td>
              <td className='freetst-td right'>
                <button>Join</button>
              </td>
            </tr>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 4</td>
              <td className='freetst-td right'>
                <button>Join</button>
              </td>
            </tr>
            <tr className='freetst-tr'>
              <td className='freetst-td left'>Test number 5</td>
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
              <th className='freetst-th'>Score</th>
            </tr>
          </thead>
          <tbody className='freetst-tbody'>
            {
              userData?.results?.map(({ score, name }) => {
                return <>
                  <tr className='freetst-tr abctable'>
                    <td className='freetst-td left'>Test {name}</td>
                    <td className='freetst-td right'>
                      <p>{score} points</p>
                    </td>
                  </tr>
                </>
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  </>

};

export default User;