const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const router = express.Router();

// Signup route (already present)
router.post('/signup', async(req, res) => {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, 
            email, 
            password: hashedPassword, 
            phone
        })

        console.log("User created:", user)
        res.status(201).json({ message: 'User created successfully' })
    }
    catch (err) {
        console.log("Signup error:", err)
        res.status(500).json({ error: 'Server error' })
    }
})

// GET all users (for dashboard)
router.get('/users', async (req, res) => {
    try {
        // Exclude password field for security
        const users = await User.find({}, { password: 0, __v: 0 });
        res.json(users);
    } catch (err) {
        console.error("Fetch users error:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
