"use client"
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
const signInUrl = 'https://api.dev2.constructn.ai/api/v1/users/signin';

export const getCookies=()=>{
    return parseCookies();
}

export const loginPost=async (email:string, password:string)=>{
    const res = await axios.post(signInUrl,{
        "email":email,
        "password":password,
    })
    return res.data.result.token;
}

export const saveToken=(tokenValue: any)=>{
    setCookie(null,'aToken',tokenValue,{path: '/'});
}

export const logout=()=>{
    const cookies = getCookies();
    if(cookies.aToken){
        destroyCookie(null,'aToken',{path:'/'});
        window.location.href='/';
        console.log("logged out");
    }
}