"use client"
import React, { useEffect, useState } from 'react'
import "./exam.css"
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import axios from 'axios'
const url = "http://localhost:3040/tests"

const Exam = () => {
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("answers")) || [])
  let { id } = useParams()
  const [data, setData] = useState()

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    localStorage.setItem('id', id)
    fetchData()
  }, [])

  const answerHandler = (answer, number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((item) =>
        item.number === number ? { ...item, answer } : item
      );
      const isExisting = prevAnswers.some((item) => item.number === number);
      return isExisting ? updatedAnswers : [...prevAnswers, { number, answer }];
    })
  }
  return <>
    {
      data ? <div className="examroom">
        <h1 className="italic">Reading Passsage {data[id - 1].parts[page].part}</h1>
        <p className="italic">You should spend about 20 minutes on every part, which are based on Reading
          passage {page + 1} down below</p>
        <div className="exampage">
          <div className="textarea">
            {
              data[id - 1].parts[page].text.map((elem) => {
                return <div>
                  <p className="headerfortext">{elem.title}</p>
                  <p>{elem.text}</p>
                </div>
              })
            }
          </div>
          <div className="questionarea">
            {
              data[id - 1].parts[page].questions.map((elem) => {
                return <div>
                  <p className="italic instructions">{elem.instructions}</p>
                  {
                    elem.texttitle ? <b className='summary'>{elem.texttitle}</b> : ''
                  }
                  {
                    elem.type === "text" ? <p className='summary'>{elem.text}</p> : ''
                  }
                  {
                    elem.items.map((elem) => {
                      return <p key={elem.number}>{elem.number}.{elem.text}<input type="text" className="answerInput" onChange={(answer) => answerHandler(answer.target.value, elem.number)} /></p>
                    })
                  }
                </div>
              })
            }
          </div>
        </div>
        <div className="pageswitcher">
          {page === 0 ? '' : <p className='chevonbutton' onClick={() => setPage(page - 1)}><CircleChevronLeft /></p>}
          <p>Page number {page + 1}</p>
          {page === 2 ? '' : <p className='chevonbutton' onClick={() => setPage(page + 1)}><CircleChevronRight /></p>}
        </div>
      </div> : ''
    }
  </>

}

export default Exam