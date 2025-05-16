
// routes/login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const data_from_mongodb_verify_for_login = require('../models/user');

// Login with email and password
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Fill all the fields' });
    }

    try {
        const user = await data_from_mongodb_verify_for_login.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // ✅ Check the password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // ✅ Success response
        return res.json({ token });
    } catch (err) {
        console.error("Server error: ", err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;