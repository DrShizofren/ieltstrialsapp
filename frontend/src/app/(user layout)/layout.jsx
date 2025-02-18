"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Book, Calendar, Star, Edit, Settings, CheckCircle, CircleX, X, House } from 'lucide-react';
import Image from 'next/image';
import "../global.css"
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname()
  console.log(pathname)
  return (
    <html lang="en">
      <body>
        {sidebarOpen ? <div className="user-sidebar">
          <X className="closesidebar" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <h1 className='usersidebarh1'>IELTsTP</h1>
          <div className="user-sidebar-content">
            <div className='usermenu1'>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/user' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/user"><House size={18} /> Home</Link>
            </div>
            <div className="line"></div>
            <div className='usermenu1'>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/results' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/results"><Book size={18} /> Results</Link>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/upcoming' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/upcoming"><Calendar size={18} /> Upcoming Tests</Link>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/subscriptions' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/subscriptions"><Star size={18} /> Become Pro</Link>
            </div>
            <div className="line"></div>
            <div className='usermenu1'>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/freetests' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/freetests"><Edit size={18} />Conduct a Free Test</Link>
              <Link onClick={() => setSidebarOpen(!sidebarOpen)} className={'/settings' === pathname ? "sidebarlinks active" : "sidebarlinks"} href="/settings"><Settings size={18} /> Settings</Link>
            </div>

          </div>
        </div> : ''}
        <div className={`user-page-body ${sidebarOpen ? "blurred" : ""}`}>
          <div className="container">
            <div className="navigation">
              <span onClick={() => setSidebarOpen(!sidebarOpen)}>☰</span>
              <span>IELTsTP</span>
              <span className='profile-image'>
                <Image
                  src="/da.png"
                  alt="Picture of the author"
                  className='profile-images'
                  width={40}
                  height={40}
                />
              </span>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}