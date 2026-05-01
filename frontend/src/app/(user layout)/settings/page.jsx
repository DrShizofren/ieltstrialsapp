'use client'
import React, { useContext, useEffect, useState } from 'react'
import "./styles.css"
import { ChevronRight, User, Palette, HelpCircle, MessageSquareWarning, LogOut, Mail, Shield } from 'lucide-react'
import { redirect } from 'next/navigation'
import { LoginUserContext } from '@/app/Context/loginusercontext'

const SECTIONS = [
  {
    title: "Account",
    items: [
      { key: "profile", label: "My profile", description: "Manage your name, email, and password", Icon: User },
      { key: "appearance", label: "Appearance", description: "Theme, layout, and accessibility", Icon: Palette },
    ],
  },
  {
    title: "Support",
    items: [
      { key: "faq", label: "FAQ", description: "Answers to frequently asked questions", Icon: HelpCircle },
      { key: "report", label: "Report a problem", description: "Tell us what went wrong", Icon: MessageSquareWarning },
    ],
  },
]

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [userData, setUserData] = useState(null)
  const { setUser } = useContext(LoginUserContext)

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")))
  }, [])

  const confirmLogout = () => {
    setShowConfirm(false)
    setUser(false)
    localStorage.removeItem("user")
    redirect("/")
  }

  const initials = (userData?.userName || "?").slice(0, 2).toUpperCase()
  const role = userData?.isTeacher ? "Teacher" : userData?.userName === "Admin" ? "Administrator" : "Student"

  return (
    <div className="settings-page">
      <div className="settings-wrap">
        <div className="settings-header">
          <h1 className='seth1'>Settings</h1>
          <p className="settings-sub">Manage your account, preferences, and support options.</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h2>{userData?.userName || "Guest"}</h2>
            <p className="profile-meta"><Mail size={14} /> {userData?.email || "no email on record"}</p>
            <span className="profile-badge"><Shield size={12} /> {role}</span>
          </div>
          <button className="profile-edit">Edit profile</button>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} className="settings-section">
            <h3 className="section-title">{section.title}</h3>
            <div className="settings-group">
              {section.items.map(({ key, label, description, Icon }) => (
                <button key={key} className="settingselements" type="button">
                  <span className="row-icon"><Icon size={18} /></span>
                  <span className="row-text">
                    <span className="row-label">{label}</span>
                    <span className="row-desc">{description}</span>
                  </span>
                  <ChevronRight size={18} className="row-chevron" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="settings-section">
          <h3 className="section-title">Session</h3>
          <button className="logout-row" onClick={() => setShowConfirm(true)} type="button">
            <span className="row-icon danger"><LogOut size={18} /></span>
            <span className="row-text">
              <span className="row-label">Log out</span>
              <span className="row-desc">End your current session on this device</span>
            </span>
            <ChevronRight size={18} className="row-chevron" />
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-modal" onClick={() => setShowConfirm(false)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon"><LogOut size={20} /></div>
            <h3>Log out of your account?</h3>
            <p>You'll need to sign in again to access your dashboard and results.</p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
