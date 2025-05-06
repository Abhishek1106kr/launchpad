import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    
    const navigate = useNavigate();
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")


    function handle_Login(){
        const apiObj = {
            email: email,
            password:password,
        }

        axios({
            method: 'POST',
            url: "http://localhost:5002/api/auth/login",
            data: apiObj,
        })
        .then((res)=>{

            const token = res.data.token

            if(token){
                localStorage.setItem("saveToken",token)
                alert("Login Successfull ✅")
                navigate('/mainpage')
            }
            
        })
        .catch((err)=>{
            alert("❌ login fail")
            console.log("the error be :->", err)
        })
    }

    return(
        <div>
        <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e)=> setEmail(e.target.value)}
            />

            <input
                type="password"
                value={password}
                placeholder="Set the password"
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button
                onClick={handle_Login}
            >Signup</button>
        </div>
    )
}

export default Login