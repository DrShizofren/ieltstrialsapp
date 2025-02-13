"use client"
import axios from 'axios'
import "../global.css"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const URL = "http://localhost:3030"

const SignUp = ({ setUser }) => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [typedUsername, setTypedUsername] = useState(true)
  const [typedEmail, setTypedEmail] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [alreadyExists, setAlreadyExists] = useState(false)

  const validatePassword = (password) => {
    return password.length >= 3 && /\d/.test(password);
  };

  const formHandler = async (e) => {

    const isPasswordValid = validatePassword(password);
    setPasswordValid(isPasswordValid);

    const userExists = data.some((elem) => elem.userName === username || elem.email === email);
    const findUser = data.find((elem) => {
      return (elem.userName === usernameoremail || elem.email === usernameoremail) && elem.password === password
    })

    if (!userExists && isPasswordValid) {
      try {
        await axios.post(URL, { userName: username, email, password });
        setUser(true);
        localStorage.setItem("user", JSON.stringify(findUser))
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      setAlreadyExists(userExists);
      if (username === "") setTypedUsername(false);
      if (email === "") setTypedEmail(false);
      if (password === "" || !isPasswordValid) setPasswordValid(false);
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
        <h1 className='logintitle'>Sign Up</h1>
        {
          alreadyExists && <p className='incorrect'>
            User already exists <FontAwesomeIcon icon={faX} onClick={() => setAlreadyExists(false)} style={{ "cursor": "pointer" }} />
          </p>
        }

        <label htmlFor="username" className='input-login-lable'>Username</label>
        <div className="passworddiv">
          <input type="text" name='username' className={typedUsername ? 'login-input' : 'login-input-error'} onChange={(e) => setUsername(e.target.value)} />
          <p className='errormessage' style={{
            "visibility": typedUsername ? 'hidden' : 'visible'
          }}>Username is required</p>
        </div>

        <label htmlFor="email" className='input-login-lable'>Email</label>
        <div className="passworddiv">
          <input type="email" name='email' className={typedEmail ? 'login-input' : 'login-input-error'} onChange={(e) => setEmail(e.target.value)} />
          <p className='errormessage' style={{
            "visibility": typedEmail ? 'hidden' : 'visible'
          }}>Email is required</p>
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

        <p className='signuplink'>Already have an account? <Link href='/login'>Log in</Link></p>
        <button type='submit' className='loginbutton'>Sign Up</button>
      </form>
    </div>
  </>
}

export default SignUp
