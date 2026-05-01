"use client"
import "../global.css"
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff, X } from 'lucide-react';
import { LoginUserContext } from '../Context/loginusercontext';

const ADMIN = {
  userName: "Admin",
  password: "admin123",
  results: [
    { name: "ieltsplustree-test1-reading", score: 5.0 },
    { name: "ieltsplustree-test2-reading", score: 7.5 },
    { name: "ieltsplustree-test3-reading", score: 4.5 },
    { name: "ieltsplustree-test4-reading", score: 8.0 },
    { name: "ieltsplustree-test5-reading", score: 6.0 },
    { name: "ieltsplustree-test6-reading", score: 8.5 },
    { name: "ieltsplustree-test7-reading", score: 5.5 },
    { name: "ieltsplustree-test8-reading", score: 9.0 },
    { name: "ieltsplustree-test9-reading", score: 6.5 },
    { name: "ieltsplustree-test10-reading", score: 4.0 },
  ],
}

const Login = () => {
  const [password, setPassword] = useState('')
  const [usernameoremail, setUsernameoremail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [typedPass, setTypedpass] = useState(true)
  const [typedUsernameorEmail, setTypedusernameoremail] = useState(true)
  const [authentication, setAuthentication] = useState(true)

  const { setUser } = useContext(LoginUserContext)

  const formHandler = (e) => {
    e.preventDefault()

    const validUsername = usernameoremail !== ""
    const validPassword = password !== ""
    setTypedusernameoremail(validUsername)
    setTypedpass(validPassword)

    if (!validUsername || !validPassword) return

    if (usernameoremail === ADMIN.userName && password === ADMIN.password) {
      setUser(true)
      localStorage.setItem("user", JSON.stringify(ADMIN))
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(u =>
      (u.userName === usernameoremail || u.email === usernameoremail) && u.password === password
    )

    if (found) {
      setUser(true)
      localStorage.setItem("user", JSON.stringify(found))
    } else {
      setAuthentication(false)
    }
  }

  return <>
    <div className="login">
      <div className="loginsquare">
        <form onSubmit={formHandler} className='formik'>
          <h1 className='logintitle'>Login</h1>
          {
            !authentication ? <p className='incorrect'>
              User not found <X size={14} onClick={() => setAuthentication(true)} style={{ "cursor": "pointer", display: "inline" }} />
            </p> : ''
          }

          <label htmlFor="usernameoremail" className='input-login-lable'>Enter username or email</label>
          <div className="passworddiv">
            <input type="text" name='usernameoremail' className={typedUsernameorEmail ? 'login-input' : 'login-input-error'} onChange={(e) => setUsernameoremail(e.target.value)} />
            <p className='errormessage' style={{
              "visibility": typedUsernameorEmail ? 'hidden' : 'visible'
            }}>incorrect username or email</p>
          </div>
          <label htmlFor="password" className='input-login-lable'>Password</label>
          <div className="passworddiv">
            <input type={showPassword ? "text" : "password"} name='password'
              onChange={(e) => setPassword(e.target.value)}
              className={typedPass ? 'login-input' : 'login-input-error'}
            />
            <p className='errormessage' style={{
              "visibility": typedPass ? 'hidden' : 'visible'
            }}>Password cannot be empty</p>
            {
              showPassword ? <EyeOff size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' /> : <Eye size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />
            }
          </div>
          <p className='signuplink'>Don't have an account? <Link href='/signup'>Sign Up</Link></p>
          <button type='submit' className='loginbutton'>Log in</button>
        </form>
      </div>
    </div>
  </>
}

export default Login
