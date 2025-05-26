// routes/signup.js - Fixed to handle missing phone field
const express = require('express');
const signup_data_to_mongodb = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Make phone optional, but name, email, password are required
    if (!name || !email || !password) {
        return res.status(400).json({ 
            error: 'Name, email, and password are required',
            missingFields: {
                name: !name,
                email: !email,
                password: !password
            }
        });
    }

    try {
        // Check if email already exists
        const existingUser = await signup_data_to_mongodb.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object with optional phone
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone: phone || '', // Default to empty string if not provided
            authProvider: 'email' // Set default auth provider
        };

        // Save user to DB
        const user = await signup_data_to_mongodb.create(userData);

        console.log('New user created:', { id: user._id, name: user.name, email: user.email });
        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Signup error:', err);
        
        // Handle MongoDB duplicate key error
        if (err.code === 11000) {
            return res.status(409).json({ error: 'User already exists' });
        }
        
        res.status(500).json({ 
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = router;