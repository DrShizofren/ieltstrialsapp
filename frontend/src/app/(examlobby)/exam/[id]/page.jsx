"use client"
import React, { useEffect, useState } from 'react'
import "./exam.css"
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'

const url = "http://localhost:3040/tests"

const Exam = () => {
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("answers")) || [])
  const [essayAnswers, setEssayAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("essayAnswers")) || [];
  });
  const [section, setSection] = useState('')
  let { id } = useParams()
  const [data, setData] = useState()
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])
  useEffect(() => {
    localStorage.setItem("section", JSON.stringify(section))
  }, [section])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    localStorage.setItem("id", id);
    fetchData();
  }, [id]);
  useEffect(() => {
    localStorage.setItem("essayAnswers", JSON.stringify(essayAnswers));
  }, [essayAnswers]);
  useEffect(() => {
    if (data) {
      sectionChecker();
    }
  }, [data]);


  const essayAnswerHandler = (answer, part) => {
    setEssayAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const index = updatedAnswers.findIndex((item) => item.part === part);

      if (index !== -1) {
        updatedAnswers[index].answer = answer;
      } else {
        updatedAnswers.push({ part, answer });
      }

      localStorage.setItem("essayAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };


  const answerHandler = (answer, number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((item) =>
        item.number === number ? { ...item, answer } : item
      );
      const isExisting = prevAnswers.some((item) => item.number === number);
      return isExisting ? updatedAnswers : [...prevAnswers, { number, answer }];
    })
  }

  const sectionChecker = () => {
    if (data) {
      if (data[id - 1].section == 'reading') {
        setSection('reading')
      }
      if (data[id - 1].section == 'writing') {
        setSection('writing')
      }
    }
  }

  return <>
    {
      data ? <div className="examroom">
        {
          section === "reading" ? (
            <>
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
            </>
          ) : section === 'writing' ? (
            <>
              <div className="writingexamdiv">
                <div className="writing-question-area">
                  <h2>{data[id - 1].parts[page].question_titles[0]}</h2>
                  {
                    data[id - 1].parts[page].question_titles.map((question) => {
                      return <h2 className='question-title'>{question}</h2>
                    })
                  }
                  {data[id - 1].parts[page].imagesrc ? <Image
                    src={data[id - 1].parts[page].imagesrc}
                    alt="Picture of the author"
                    className='writing-image'
                    width={600}
                    height={400}
                  /> : ''}
                </div>
                <div className="answer-area">
                  <h2>Write your asnwer down below. (Do not exceed {data[id - 1].parts[page].part === 1 ? 300 : 500} words)</h2>
                  <textarea
                    name="writinganswer"
                    id="writinganswer"
                    className='writinganswer'
                    placeholder='Enter your answer here...'
                    rows="30"
                    cols="100"
                    value={essayAnswers.find((item) => item.part === data[id - 1].parts[page].part)?.answer || ""}
                    onChange={(e) => essayAnswerHandler(e.target.value, data[id - 1].parts[page].part)}
                  />
                  <p className='wordCount'>
                    Words: {essayAnswers[page] && essayAnswers[page].answer ? essayAnswers[page].answer.trim().split(' ').length : 0}
                  </p>

                </div>
              </div>
              <div className="pageswitcher">
                {page === 0 ? '' : <p className='chevonbutton' onClick={() => setPage(page - 1)}><CircleChevronLeft /></p>}
                <p>Page number {page + 1}</p>
                {page === 1 ? '' : <p className='chevonbutton' onClick={() => setPage(page + 1)}><CircleChevronRight /></p>}
              </div>
            </>
          ) : null
        }
      </div> : ''
    }
  </>

}

export default Exam