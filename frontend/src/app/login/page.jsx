"use client"
import axios from 'axios'
import "../global.css"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const URL = "http://localhost:3030"

const Login = ({ setUser }) => {

  
  const [data, setData] = useState()
  const [password, setPassword] = useState('')
  const [usernameoremail, setUsernameoremail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [typedPass, setTypedpass] = useState(true)
  const [typedUsernameorEmail, setTypedusernameoremail] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [authentication, setAuthentication] = useState(true)

  const validatePassword = (password) => {
    return password.length >= 3 && /\d/.test(password);
  };

  const formHandler = (e) => {
    e.preventDefault()

    const isPasswordValid = validatePassword(password);
    setPasswordValid(isPasswordValid);

    const findUser = data.find((elem) => {
      return (elem.userName === usernameoremail || elem.email === usernameoremail) && elem.password === password
    })

    if (findUser && isPasswordValid) {
      setUser(true)
      localStorage.setItem("user", JSON.stringify(findUser))
    } else {
      setAuthentication(false)
      if (usernameoremail === "") {
        setTypedusernameoremail(false);
      }
      if (password === "" || !isPasswordValid) {
        setTypedpass(false);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URL)
        setData(res.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  return <>
    <div className="login">
      <form onSubmit={formHandler} className='formik'>
        <h1 className='logintitle'>Login</h1>
        {
          !authentication ? <p className='incorrect'>
            User not found <FontAwesomeIcon icon={faX} onClick={() => setAuthentication(true)} style={{ "cursor": "pointer" }} />
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
            className={passwordValid ? 'login-input' : 'login-input-error'}
          />
          <p className='errormessage' style={{
            "visibility": passwordValid ? 'hidden' : 'visible'
          }}>Password must be at least 3 characters and contain at least 1 digit</p>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />
        </div>
        <p className='signuplink'>Don't have an account? <Link href='/signup'>Sign Up</Link></p>
        <button type='submit' className='loginbutton'>Log in</button>
      </form>
    </div>
  </>
}

export default Login
