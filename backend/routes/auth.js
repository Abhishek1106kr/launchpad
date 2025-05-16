const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();
const data_from_mongodb_verify_for_login = require('../models/user');

// In-memory OTP storage (in production, use Redis or another solution)
const otpStore = new Map();

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

// Send OTP via Fast2SMS
router.post('/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;
        
        // Validate phone number
        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }
        
        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        
        // Store OTP with phone number (with 5-minute expiry)
        otpStore.set(phone, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes from now
        });
        
        // Configure Fast2SMS API request
        const options = {
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.FAST2SMS_API_KEY
            },
            data: {
                variables_values: otp,
                route: 'otp',
                numbers: phone
            }
        };
        
        // Send OTP
        const response = await axios(options);
        
        // Check if SMS was sent successfully
        if (response.data.return === true) {
            res.status(200).json({ message: 'OTP sent successfully' });
        } else {
            res.status(400).json({ message: 'Failed to send OTP' });
        }
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ message: 'Server error when sending OTP' });
    }
});

// Verify OTP and login
router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body;
        
        // Check if OTP exists and is valid
        const storedOTPData = otpStore.get(phone);
        
        if (!storedOTPData || storedOTPData.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
        
        // Check if OTP is expired
        if (Date.now() > storedOTPData.expiresAt) {
            otpStore.delete(phone); // Clean up expired OTP
            return res.status(401).json({ message: 'OTP expired' });
        }
        
        // OTP is valid, find user by phone number
        let user = await data_from_mongodb_verify_for_login.findOne({ phone });
        
        if (!user) {
            return res.status(404).json({ message: 'No account found with this phone number. Please register first.' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        // Clean up used OTP
        otpStore.delete(phone);
        
        return res.json({ token });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Server error when verifying OTP' });
    }
});

module.exports = router;
