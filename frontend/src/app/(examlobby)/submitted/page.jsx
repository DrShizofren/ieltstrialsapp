'use client'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "../submitted/submitted.css"
import axios from 'axios'

const url = "http://localhost:3040/tests"

const Submitted = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [ieltsScore, setIeltsScore] = useState();
  const [id, setId] = useState(localStorage.getItem("id") || 12)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [name, setName] = useState(localStorage.getItem("testName") || '')
  const [data, setData] = useState(null);
  const [patchUrl, setPatchUrl] = useState("http://localhost:3030/" + user._id + "/results")
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const [section, setSection] = useState(JSON.parse(localStorage.getItem("section")) || [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (!ieltsScore || hasSentRequest) return;
    console.log(ieltsScore, name);

    if (ieltsScore && name && section === "reading") {
      axios.patch(patchUrl, {
        "results": {
          "name": name,
          "score": ieltsScore
        }
      })
        .then(() => {
          setHasSentRequest(true);
        })
        .catch(error => console.error("Error updating results:", error));

      localStorage.removeItem('answers');
      localStorage.removeItem('testName');
      localStorage.removeItem('id');
    } else {
      console.log("Failed initialization");
    }
    localStorage.removeItem("essayAnswers")
    localStorage.removeItem("answers")
    localStorage.removeItem("id")
    localStorage.removeItem("section")
    localStorage.removeItem("testName")
  }, [ieltsScore]);


  useEffect(() => {
    if (data) {
      const correctAnswers = data[id - 1]?.answers || [];
      const studentAnswers = JSON.parse(localStorage.getItem("answers")) || [];

      let correct = 0;

      studentAnswers.forEach(({ number, answer }) => {
        const correctAnswer = correctAnswers[number - 1];
        if (correctAnswer) {
          const normalizedCorrect = String(correctAnswer).trim().toLowerCase();
          const normalizedStudent = String(answer).trim().toLowerCase();
          if (normalizedCorrect === normalizedStudent) {
            correct++;
          }
        }
      });

      console.log("Final Correct Count:", correct);
      setCorrectCount(correct);
      setIeltsScore(calculateIeltsScore(correct));
    }
  }, [data, id]);

  const calculateIeltsScore = (correct) => {
    if (correct >= 39) return 9.0;
    if (correct >= 37) return 8.5;
    if (correct >= 35) return 8.0;
    if (correct >= 32) return 7.5;
    if (correct >= 30) return 7.0;
    if (correct >= 27) return 6.5;
    if (correct >= 23) return 6.0;
    if (correct >= 19) return 5.5;
    if (correct >= 15) return 5.0;
    if (correct >= 12) return 4.5;
    if (correct >= 9) return 4.0;
    if (correct >= 6) return 3.5;
    if (correct >= 4) return 3.0;
    if (correct >= 2) return 2.5;
    return 2.0;
  };

  return <>
    {
      section === "reading" ? <div className='submittedform'>
        <div className="submitted-box">
          <h1>Your Results are Submitted!</h1>
          <p>Your results will be displayed in the dashboard</p>
          <p>Correct Answers: {correctCount}/40</p>
          <p>Your IELTS Reading Score: {ieltsScore}</p>
          <button onClick={() => redirect("/")}>Back to Home Page</button>
        </div>
      </div> : section === "writing" ? <div className='submittedform'>
        <div className="submitted-box">
          <h1>Your Essays are Submitted!</h1>
          <p>Your results will be checked by teacher and sent to you</p>
          <button onClick={() => redirect("/")}>Back to Home Page</button>
        </div>
      </div> : ''
    }
  </>
};

export default Submitted;
