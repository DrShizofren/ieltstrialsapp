"use client"
import { redirect } from "next/dist/server/api-utils";

export default function ExamLayout({ children }) {
  return <>
    <div className="navbar">
      <div className="timer">Timer : 42:39</div>
      <div className="subandhigh">
        <button className="submittedbutton" onClick={() => redirect('/exam/submitted')}>Submit</button>
        <button className="submittedbutton">Highlighter</button>
      </div>
    </div>
    {children}
  </>
}
