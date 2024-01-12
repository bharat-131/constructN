"use client"
import React from 'react';
import { parseCookies } from 'nookies';
import { logout } from '../functions';
const Home: React.FC = () => {
    const getToken = () => {
        let token=parseCookies().aToken;
        console.log(token);
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home