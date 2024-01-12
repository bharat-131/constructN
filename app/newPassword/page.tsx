"use client"
import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
const Home: React.FC = () => {
    const [password,setPassword]=useState('');
    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
          const token = parseCookies().rpToken;
          const newPasswordUrl = `https://api.dev2.constructn.ai/api/v1/users/reset-password/${token}`;
          const res = await axios.put(newPasswordUrl,{"password":password});
          console.log(res.data);
          setPassword('');
          try{
            console.log(res.data);
            window.location.href="/dashboard?msg=Your password has been reset successfully.";
          } catch(error:any){
            alert("Invalid Credentials");
          }
        } catch (error:any) {
          console.error('An error occurred:', error);
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
        <h1 className="text-[#f1742e] text-2xl">Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-solid border-[#f1742e] p-2 m-1 rounded-md w-full" required/>
          <br />
          <button
            type='submit'
            className="bg-[#f1742e] text-white p-2 m-1 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >Set Password</button>
          <br />
        </form>
      </div>
    </div>
    )
}
export default Home