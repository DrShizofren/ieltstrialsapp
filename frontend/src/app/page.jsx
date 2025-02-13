"use client";
import { useEffect, useState } from "react";
import Login from "./login/page.jsx";
import User from "./(user layout)/user/page.jsx";
import { redirect } from 'next/navigation'

const Home = () => {
  const [user,setUser] = useState(false)
  
  useEffect(() => {
    setUser(typeof window !== 'undefined' ? localStorage.getItem('user') : false)
  },[])

  return (
    <>
      {
        user ? redirect('/user') : <Login setUser={setUser}/>
      }
    </>
  );
};

export default Home;
