const express = require('express');
const signup_data_to_mongodb = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await signup_data_to_mongodb.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to DB
        const user = await signup_data_to_mongodb.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        console.log(user);
        res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;