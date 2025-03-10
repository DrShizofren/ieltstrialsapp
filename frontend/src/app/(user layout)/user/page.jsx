"use client"
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from "react-google-charts";

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))
  const [number, setNumber] = useState(0)
  const [loginData, setLoginData] = useState([])
  const [setted, setSetted] = useState(true)
  const [chartData, setChartData] = useState([
    ["Attempt", "Score"],
    [1, 8],
  ]);

  const URL = "http://localhost:3030"

  const updateChartData = (results) => {
    setChartData((prevData) => {
      let lastPrice = prevData[prevData.length - 1][0];
      const newData = [...prevData];
      results.forEach(result => {
        lastPrice += 1;
        newData.push([lastPrice, result.score]);
      });
      return newData;
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URL);
        setLoginData(res.data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
    if (setted) {
      if (userData.results && Array.isArray(userData.results)) {
        updateChartData(userData.results);
        setSetted(false)
      }
    }
    console.log("Component loaded");
    console.log(loginData);
  }, [])

  useEffect(() => {
    if (loginData && userData) {
      const matchingUser = loginData.find(user => user._id === userData._id);

      if (matchingUser) {
        localStorage.setItem("user", JSON.stringify(matchingUser));
        console.log(matchingUser);
        setUserData(matchingUser);
        // console.log("LocalStorage updated:", matchingUser);
      } else {
        console.log("User not found in database.");
      }
    }
  }, [loginData]);

  const options = {
    title: "Last Results and Improvements",
    titleTextStyle: { color: "#333", fontSize: 18, bold: true },
    curveType: "function",
    backgroundColor: "white",
    colors: ["#6f6fec"],
    hAxis: {
      gridlines: { color: "#ddd" },
      ticks: [],
      titleTextStyle: { color: "#666", fontSize: 14 },
      textStyle: { color: "#666" }
    },
    vAxis: {
      viewWindow: { max: 9.5, min: 0 },
      gridlines: { color: "#ddd" },
      titleTextStyle: { color: "#666", fontSize: 14 },
      textStyle: { color: "#666" }
    },
    legend: "none"
  };
  return <>
    <div className={`content ${sidebarOpen ? "blurred" : ""}`}>
      <div style={{
        width: "1300px",
        height: "500px",
        border: "4px solid #6f6fec",
        borderRadius: "20px",
        overflow: "hidden",
        background: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        cursor: "pointer"
      }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
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
              userData ? userData.results.map(({ score, name }) => {
                return <>
                  <tr className='freetst-tr abctable'>
                    <td className='freetst-td left'>Test {name}</td>
                    <td className='freetst-td right'>
                      <p>{score} points</p>
                    </td>
                  </tr>
                </>
              }) : ''
            }
          </tbody>
        </table>

      </div>
    </div>
  </>

};

export default User;