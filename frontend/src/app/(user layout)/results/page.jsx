"use client"
import React, { useState } from 'react'

const Results = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))
  return <div className='results-table'>
    <table className='freetst-table'>
      <thead className='freetst-thead'>
        <tr className='freetst-tr'>
          <th className='freetst-th'>Last results</th>
          <th className='freetst-th'>Score</th>
          <th className='freetst-th'>Action</th>
        </tr>
      </thead>
      <tbody className='freetst-tbody'>
        {
          userData ? userData.results.map(({ score, name }) => {
            return <>
              <tr className='freetst-tr'>
                <td className='freetst-td'>Test {name}</td>
                <td className='freetst-td'>
                  <p>{score} points</p>
                </td>
                <td className='freetst-td'>
                  <button onClick={() => console.log(name)}>Review mistakes</button>
                </td>
              </tr>
            </>
          }) : ''
        }
      </tbody>
    </table>
  </div>
}

export default Results