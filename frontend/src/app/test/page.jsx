"use client";
import React, { useState, useEffect } from "react";
import "./test.css";

const questionsPage1 = [
  { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
  { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
];

const questionsPage2 = [
  { id: 3, question: "Which planet is known as the Red Planet?", answer: "" },
  { id: 4, question: "Who wrote 'Hamlet'?", answer: "" },
  { id: 5, question: "What is the square root of 64?", answer: "" },
];

export default function Test() {
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem("answers")) || {});
  const [timeLeft, setTimeLeft] = useState(() => JSON.parse(localStorage.getItem("timeLeft")) || 60);
  const [submitted, setSubmitted] = useState(() => JSON.parse(localStorage.getItem("submitted")) || false);
  const [page, setPage] = useState(() => JSON.parse(localStorage.getItem("page")) || 1);
  const [highlights, setHighlights] = useState(() => JSON.parse(localStorage.getItem("highlights")) || []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("submitted", JSON.stringify(submitted));
  }, [submitted]);

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    localStorage.setItem("highlights", JSON.stringify(highlights));
  }, [highlights]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      setHighlights([...highlights, selection.toString()]);
    }
  };

  return (
    <div className="test-container" onMouseUp={handleTextSelection}>
      <div className="card">
        <div className="card-content">
          <h2 className="title">Test</h2>
          <p className="timer">Time Left: {timeLeft}s</p>
          {page === 1 &&
            questionsPage1.map((q) => (
              <div key={q.id} className="question-block">
                <p className="question">{q.question}</p>
                {q.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          {page === 2 &&
            questionsPage2.map((q) => (
              <div key={q.id} className="question-block">
                <p className="question">{q.question}</p>
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  disabled={submitted}
                  className="text-input"
                />
              </div>
            ))}
          <div className="navigation-buttons">
            {page === 2 && (
              <button onClick={() => setPage(1)} className="submit-button">
                Previous
              </button>
            )}
            {page === 1 && (
              <button onClick={() => setPage(2)} className="submit-button">
                Next
              </button>
            )}
            <button onClick={handleSubmit} disabled={submitted} className="submit-button">
              Submit
            </button>
          </div>
          {submitted && <p className="submitted-message">Test Submitted!</p>}
          <div className="highlighted-text">
            {highlights.map((text, index) => (
              <span key={index} className="highlight">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
  