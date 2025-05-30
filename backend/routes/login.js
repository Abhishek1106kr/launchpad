const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user');
const router = express.Router();

// POST /api/auth/login (existing)
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Fill all the places' })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        return res.json({ token })
    }
    catch (err) {
        console.log("Login error:", err)
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/auth/login (returns user info if token is valid)
// GET /api/auth/me (returns user info if token is valid)
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email avatar');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
