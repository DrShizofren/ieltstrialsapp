import React from 'react'
import "./styles.css"
import { ChevronRight } from 'lucide-react'

const Settings = () => {
  const settings = ['My profile', 'Appearance', 'FAQ', 'Report a problem']
  return <div className="settings-page">
    <div className="settingssquare">
      <h1 className='seth1'>Settings</h1>
      {
        settings.map((elem) => {
          return <p className="settingselements">
            {elem}
            <ChevronRight />
          </p>
        })
      }
    </div>
  </div>
}

export default Settings