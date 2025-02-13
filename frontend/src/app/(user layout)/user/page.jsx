"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Book, Calendar, Star, Edit, Settings, CheckCircle, CircleX, X, House } from 'lucide-react';
import Image from 'next/image';

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <>
    <div className={`content ${sidebarOpen ? "blurred" : ""}`}>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Reading</th>
            <th>Listening</th>
            <th>Writing</th>
            <th>Speaking</th>
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7.5</td>
            <td>8.0</td>
            <td>6.5</td>
            <td>7.0</td>
            <td>7.3</td>
          </tr>
        </tbody>
      </table>
      <div className="sub-tables">
        <div className="sub-table">
          <h3>Upcoming Tests</h3>
          <p>Test 1 <button className="join-btn">Join</button></p>
          <p>Test 2 <button className="join-btn">Join</button></p>
        </div>
        <div className="sub-table">
          <h3>Last Results</h3>
          <p>Test 1: 7.5 <CheckCircle size={16} /></p>
          <p>Test 2: 6.8 <CheckCircle size={16} /></p>
        </div>
      </div>
    </div>
  </>

};

export default User;