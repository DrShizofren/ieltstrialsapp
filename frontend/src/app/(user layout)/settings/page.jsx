'use client'
import React, { useContext, useState } from 'react'
import "./styles.css"
import { ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'
import { LoginUserContext } from '@/app/Context/loginusercontext'

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const settings = ['My profile', 'Appearance', 'FAQ', 'Report a problem', 'Log out']

  const settingsHandler = (elem) => {
    if (elem === "Log out") {
      setShowConfirm(true);
    }
  }

  const { setUser } = useContext(LoginUserContext)

  const confirmLogout = () => {
    setShowConfirm(false);
    setUser(false)
    localStorage.removeItem("user")
    console.log("redirectreed");
    redirect("/")
  }

  return (
    <div className="settings-page">
      <div className="settingssquare">
        <h1 className='seth1'>Settings</h1>
        {settings.map((elem) => (
          <p onClick={() => settingsHandler(elem)} className="settingselements" key={elem}>
            {elem}
            <ChevronRight />
          </p>
        ))}
      </div>
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Are you sure you want to log out?</p>
            <button className="confirm-btn" onClick={confirmLogout}>Yes</button>
            <button className="cancel-btn" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;