"use client"
import "../global.css";
import React, { useContext, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { LoginUserContext } from '../Context/loginusercontext';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [typedUsername, setTypedUsername] = useState(true);
  const [typedEmail, setTypedEmail] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const { setUser } = useContext(LoginUserContext);
  const router = useRouter();

  const validatePassword = (p) => p.length >= 3 && /\d/.test(p);

  const formHandler = (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    setPasswordValid(isPasswordValid);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u) => u.userName === username || u.email === email);

    if (!username) { setTypedUsername(false); return; }
    if (!email) { setTypedEmail(false); return; }
    if (!isPasswordValid) return;
    if (userExists) { setAlreadyExists(true); return; }

    const newUser = { userName: username, email, password, results: [], isTeacher: false };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(true);
    router.push("/user");
  };

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

          <label htmlFor="username" className='input-login-lable'>Username</label>
          <div className="passworddiv">
            <input type="text" name='username' className={typedUsername ? 'login-input' : 'login-input-error'} onChange={(e) => setUsername(e.target.value)} />
            <p className='errormessage' style={{ visibility: typedUsername ? 'hidden' : 'visible' }}>Username is required</p>
          </div>

          <label htmlFor="email" className='input-login-lable'>Email</label>
          <div className="passworddiv">
            <input type="email" name='email' className={typedEmail ? 'login-input' : 'login-input-error'} onChange={(e) => setEmail(e.target.value)} />
            <p className='errormessage' style={{ visibility: typedEmail ? 'hidden' : 'visible' }}>Email is required</p>
          </div>

          <label htmlFor="password" className='input-login-lable'>Password</label>
          <div className="passworddiv">
            <input type={showPassword ? "text" : "password"} name='password' onChange={(e) => setPassword(e.target.value)} className={passwordValid ? 'login-input' : 'login-input-error'} />
            <p className='errormessage' style={{ visibility: passwordValid ? 'hidden' : 'visible' }}>Password must be at least 3 characters and contain at least 1 digit</p>
            {showPassword
              ? <EyeOff size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />
              : <Eye size={16} onClick={() => setShowPassword(!showPassword)} className='eyeicon' />}
          </div>

          <p className='signuplink'>Already have an account? <Link href='/'>Log in</Link></p>
          <button type='submit' className='loginbutton'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
