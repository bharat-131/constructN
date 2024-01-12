"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loginPost, saveToken } from '../functions';
const Home: React.FC=()=> {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const registerUrl = 'https://api.dev2.constructn.ai/api/v1/users/register';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const pwRegex = /^.{8,}$/;
  const pwRegex2 = /^.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-].*$/;
  const disappearError=()=>{
    setTimeout(() => {
      setError('');
    }, 2000);
  }
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(firstName===""){
      setError("*Please enter first name");
      disappearError();
    }else if(lastName===""){
      setError("*Please enter last name");
      disappearError();
    }else if(email===""){
      setError("*Please enter email");
      disappearError();
    }else if(!emailRegex.test(email)){
      setError("*Invalid email address");
      disappearError();
    }else if(!pwRegex.test(password)){
      setError("*Password should be at least 8 characters long");
      disappearError();
    }else if(!pwRegex2.test(password)){
      setError("*Password should contain at least one special symbol");
      disappearError();
    }else if(password!==cpassword){
      setError("*Passwords do not match!");
      disappearError();
    }else if(!checked){
      setError("*Please agree to the Terms of Service and Privacy Policy");
      disappearError();
    }else{
    try{
      const res = await axios.post(registerUrl,{
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "password":password,
      })
      const res2 = loginPost(email,password);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setcPassword('');
      if(res.data){
        console.log("Registered successfully");
        saveToken(res2);
        console.log(res2);
        router.push('/dashboard');
      } else{
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
      <div className="absolute top-1/2 transform -translate-y-1/2 right-[8%] bg-transparent p-8 w-1/3" >
      <h1 className="text-[#f1742e] text-2xl pl-30 ml-30 mt-50 mb-30">Sign Up</h1>
      <form onSubmit={handleSignUp}>
      <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
      <br />
      <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
      <br />
      <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
      <br />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
      <br />
      <input type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setcPassword(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full"/>
      <br />
      <input onChange={(e) => setChecked(e.target.checked)} type="checkbox" style={{ color: "#f1742e" }} className="text-red-500 mb-2"/><label className="text-sm">I agree to the <Link href="/terms" style={{ color: "#f1742e" }} className="text-red-500 mb-2">Terms of Service</Link> and <Link href="/policy" style={{ color: "#f1742e" }} className="text-red-500 mb-2">Privacy Policy</Link></label>
      <br />
      <p className="text-red-500">{error}</p>
      <button
            type="submit"
            className="bg-[#f1742e] text-white p-2 m-1 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
      Create Account</button>
      <br />
      </form>
      <p>Already a user? then <Link href="/" style={{ color: "#f1742e" }} className="text-red-500 mb-2">Sign In</Link></p>
      </div>
    </div>
  )
}
export default Home