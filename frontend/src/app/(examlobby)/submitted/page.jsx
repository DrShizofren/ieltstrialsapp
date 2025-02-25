'use client'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "../submitted/submitted.css"
import axios from 'axios'
const url = "http://localhost:3040/tests"

const Submitted = () => {
  const url = "http://localhost:3040/tests"
  const [correctCount, setCorrectCount] = useState(0);
  const [id, setId] = useState(localStorage.getItem("id") || 12)
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
  }, []);

  const answerHandler = () => {
    if (data) {
      const correctAnswers = data[id - 1].answers; // Correct answers from data
      const studentAnswers = JSON.parse(localStorage.getItem("answers")) || []; // Student's answers

      let correct = 0;
      correctAnswers.forEach((answer, index) => {
        if (answer === studentAnswers[index]) {
          correct++;
        }
      });
      setCorrectCount(correct);
    }
  }
  answerHandler()
  return <div className='submittedform'>

    <h1>Your Results are submitted!</h1>
    <p>Your results will be displayed in the dashboard</p>
    <button onClick={() => redirect("/")}>Back to home page</button>
    {
      console.log(correctCount)
    }
  </div>
}

export default Submitted