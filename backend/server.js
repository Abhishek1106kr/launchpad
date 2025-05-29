const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config();

const app = express();

const signup = require('./routes/signup')
const login = require('./routes/login')

app.use(cors())
app.use(express.json())

// Simplified MongoDB connection - remove all deprecated options
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB is connected");
        
        // Set up routes after successful DB connection
        app.use('/api/auth', signup);
        app.use('/api/auth', login);
        
    } catch (err) {
        console.log("❌ MongoDB connection error:", err);
    }
};

connectDB();

const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
