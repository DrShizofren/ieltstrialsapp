"use client"
import axios from 'axios';
import "../global.css";
import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { LoginUserContext } from '../Context/loginusercontext';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const URL = "http://localhost:3030/"; // Ensure correct API endpoint

const SignUp = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [typedUsername, setTypedUsername] = useState(true);
  const [typedEmail, setTypedEmail] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const { setUser } = useContext(LoginUserContext);

  const router = useRouter()

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 3 && /\d/.test(password);
  };

  // Form submission handler
  const formHandler = async (e) => {
    e.preventDefault(); // Prevent form refresh

    const isPasswordValid = validatePassword(password);
    setPasswordValid(isPasswordValid);

    const userExists = data.some((elem) => elem.userName === username || elem.email === email);

    if (!userExists && isPasswordValid) {
      try {
        const response = await axios.post(URL, {
          userName: username,
          email,
          password,
          results: [],
          isTeacher: false,
          studentsList: []
        });
        setUser(true);
        localStorage.setItem("user", JSON.stringify(response.data)); // Store new user in localStorage
        // Refetch users after successful signup
        fetchData();
        router.push("/user")
        redirect("/user")
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      setAlreadyExists(userExists);
      if (username === "") setTypedUsername(false);
      if (email === "") setTypedEmail(false);
      if (password === "" || !isPasswordValid) setPasswordValid(false);
    }
  };

  // Fetch existing users
  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="login">
      <div className="loginsquare">
        <form onSubmit={formHandler} className='formik'>
          <h1 className='logintitle'>Sign Up</h1>

          {alreadyExists && (
            <p className='incorrect'>
              User already exists <span onClick={() => setAlreadyExists(false)} style={{ cursor: "pointer" }}>✖</span>
            </p>
          )}

          {/* Username Input */}
          <label htmlFor="username" className='input-login-lable'>Username</label>
          <div className="passworddiv">
            <input
              type="text"
              name='username'
              className={typedUsername ? 'login-input' : 'login-input-error'}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className='errormessage' style={{ visibility: typedUsername ? 'hidden' : 'visible' }}>
              Username is required
            </p>
          </div>

          {/* Email Input */}
          <label htmlFor="email" className='input-login-lable'>Email</label>
          <div className="passworddiv">
            <input
              type="email"
              name='email'
              className={typedEmail ? 'login-input' : 'login-input-error'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='errormessage' style={{ visibility: typedEmail ? 'hidden' : 'visible' }}>
              Email is required
            </p>
          </div>

          {/* Password Input */}
          <label htmlFor="password" className='input-login-lable'>Password</label>
          <div className="passworddiv">
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              className={passwordValid ? 'login-input' : 'login-input-error'}
            />
            <p className='errormessage' style={{ visibility: passwordValid ? 'hidden' : 'visible' }}>
              Password must be at least 3 characters and contain at least 1 digit
            </p>
            {showPassword ? (
              <EyeOff size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />
            ) : (
              <Eye size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />
            )}
          </div>

          <p className='signuplink'>
            Already have an account? <Link href='/'>Log in</Link>
          </p>

          <button type='submit' className='loginbutton'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
