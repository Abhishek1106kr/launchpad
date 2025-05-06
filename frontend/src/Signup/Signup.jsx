import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function Signup(){

    const navigate = useNavigate();
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[phone, setPhone] = useState("")


    function handle_Singup(){

        const apiObj = {
            name: name, 
            email: email,
            password: password,
            phone: phone
        }

        axios({
            method: "POST",
            url: 'http://localhost:5002/api/auth/signup',
            data: apiObj,
        })
        .then(()=>{
            alert("Signup complete ✅")
            navigate('/login')
        })
        .catch((err)=>{
            console.log("error:->", err)
        })
    }

    return(
        <div>
            <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e)=> setName(e.target.value)}
            />

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


            <input
                type="tel"
                value={phone}
                placeholder="Enter the phone"
                onChange={(e)=> setPhone(e.target.value)}
            />

            <button
                onClick={handle_Singup}
            >Signup</button>

            <p>already a user? <Link to={'/login'} >login</Link> </p>
        </div>
    )
}

export default Signup