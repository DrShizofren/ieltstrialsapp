"use client";
import { useContext, useEffect, useState } from "react";
import Login from "./login/page.jsx";
import { redirect } from 'next/navigation'
import { LoginUserContext } from "./Context/loginusercontext.jsx";

const Home = () => {
  const { user, setUser } = useContext(LoginUserContext)

  useEffect(() => {
    setUser(typeof window !== 'undefined' ? localStorage.getItem('user') : false)
  }, [])

  return (
    <>
      {
        user ? redirect('/user') : <Login />
      }
    </>
  );
};

export default Home;
