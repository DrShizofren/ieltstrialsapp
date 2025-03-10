'use client'
import React from 'react'
import "./styles.css"
import { redirect } from 'next/navigation'

const UpcomingTests = () => {
  return <div className='upcomingpage'>
    Coming soon...
    <button className='upbutton' onClick={() => redirect('/freetests')}>Try free tests</button>
  </div>
}

export default UpcomingTests