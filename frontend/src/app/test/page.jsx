'use client'
import React, { useState } from 'react'
import "./test.css"
const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <div className="container">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>Sidebar Content</div>
    </div>
  </>
}

export default Test