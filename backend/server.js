const express = require("express")
const mongoose = require('mongoose')

const app = express();

const signup = require('./routes/signup')
const login = require('./routes/login')

const cors = require("cors")
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.use('/api/auth', signup);
app.use('/api/auth', login)


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("✅ mongodb is connected")
    })
    .catch((err)=>{
        console.log("the error be :-> ", err)
    })


const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})