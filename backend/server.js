const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config();

const app = express();

const signup = require('./routes/signup')
const login = require('./routes/login')
const testimonials = require('./routes/testimonials')
const events = require('./routes/upcomingevents')
const opportunities = require('./routes/opportunities')
const resources = require('./routes/resources');
const trendingEvents = require('./routes/trendingevents');
const profile = require('./routes/profile');
const apply = require('./routes/apply');

const eventRegister = require('./routes/eventRegister');






app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB is connected");
        app.use('/api/auth', signup);
        app.use('/api/auth', login);
        app.use('/api/testimonials', testimonials)
        app.use('/api/events', events)
        app.use('/api/opportunities', opportunities);
        app.use('/api/resources', resources);
        app.use('/api/trendingevents', trendingEvents);
        app.use('/api/profile', profile);
        app.use('/api/apply', apply);
        app.use('/api/event-register', eventRegister);

    } 
    catch (err) {
        console.log("❌ MongoDB connection error:", err);
    }
};

connectDB();

const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
