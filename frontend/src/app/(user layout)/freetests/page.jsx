"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

const url = "http://localhost:3040/tests"

const FreeTests = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])
  const handleExam = (id, name) => {
    localStorage.setItem("testName", name)
    redirect(`/exam/${id}`)
  }
  console.log(data);

  return <div className='freetst-body'>
    <table className='freetst-table'>
      <thead className='freetst-thead'>
        <tr className='freetst-tr'>
          <th className='freetst-th'>Tests</th>
          <th className='freetst-th'>Section</th>
          <th className='freetst-th'>Actions</th>
        </tr>
      </thead>
      <tbody className='freetst-tbody'>
        {
          data ? data.map(({ id, name, section }) => {
            return <tr key={id} className='freetst-tr'>
              <td className='freetst-td'>Free test number {id}</td>
              <td className='freetst-td'>{section}</td>
              <td className='freetst-td'>
                <button onClick={() => handleExam(id, name)}>Start test</button>
              </td>
            </tr>
          }) : ''
        }
      </tbody>
    </table>
  </div>
}

export default FreeTests