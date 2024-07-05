'use client'
import React from 'react'
export const Login = () => {
    const login = () : void =>{
        alert("tipo otkrilas /login")
    }
    return(
        <button className="text-white" onClick={login}>
        Login
    </button>
    )
}