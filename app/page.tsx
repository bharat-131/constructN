"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { saveToken, getCookies, loginPost } from './functions';
import { useRouter } from 'next/navigation';
import WarningNotification from './components/WarningNotification';
const Home: React.FC=()=>  {
  const cookies=getCookies();
  const router = useRouter();
  if (cookies.aToken){
    router.push("/dashboard");
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const disappearError=()=>{
    setTimeout(() => {
      setError('');
    }, 2000);
  }
  const handleLogin=async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(email===""){
      setError("*Please enter email");
      disappearError();
    }else if(!emailRegex.test(email)){
      setError("*Invalid email address");
      disappearError();
    }else if(password===""){
      setError("*Please enter password");
      disappearError();
    }else{
    try{
      const res=loginPost(email,password);
      setEmail('');
      setPassword('');
      try{
        console.log(res);
        saveToken(res);
        router.push("/dashboard");
      } catch(error:any){
        alert("Invalid Credentials");
      }
    } catch (error:any) {
      console.error('An error occurred:', error);
    }
  }
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="relative h-full">
        <img
          src="https://app.constructn.ai/_next/static/media/logo-yellow.1fc0a594.svg"
          alt="Logo"
          className="absolute top-5 left-9"
        />
        <img
          src="https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg"
          alt="Illustration"
          className="h-full object-cover"
        />  
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-[8%] bg-transparent p-8 w-1/3">
        <h1 className="text-[#f1742e] text-2xl">Sign In</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
          <br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
          <br />
          <p style={{ color: "#f1742e" }} className="text-red-500 mb-2"><Link href="/resetPassword">Forgot password?</Link></p>
          <br />
          <p className="text-red-500">{error}</p>
          <button
            type='submit'
            className="bg-[#f1742e] text-white p-2 m-1 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >Sign In</button>
          <br />
        </form>
        <p>New User? then <Link href="/signup" style={{ color: "#f1742e" }} className="text-red-500 mb-2">Sign Up</Link></p>
      </div>
    </div>
  )
}
export default Home