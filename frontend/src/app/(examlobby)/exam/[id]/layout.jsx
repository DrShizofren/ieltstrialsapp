"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ExamLayout({ children }) {
  const initialTime = 3600;
  const [timeLeft, setTimeLeft] = useState(() => {
    return JSON.parse(localStorage.getItem("timeLeft")) ?? initialTime;
  });
  const [submitted, setSubmitted] = useState(() => {
    return JSON.parse(localStorage.getItem("submitted")) ?? false;
  });

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("submitted", JSON.stringify(submitted));
  }, [submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.removeItem("timeLeft")
    localStorage.removeItem("submitted")
    setSubmitted(false)
    redirect("/submitted")
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="navbar">
        <div className="timer">Time left: {formatTime(timeLeft)}</div>
        <div className="subandhigh">
          <button className="submittedbutton" onClick={handleSubmit}>Submit</button>
          <button className="submittedbutton">Highlighter</button>
        </div>
      </div>
      {children}
    </>
  );
}
