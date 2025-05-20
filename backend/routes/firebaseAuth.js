// routes/firebaseAuth.js (Updated)

const express = require('express');
const router = express.Router();
const { verifyFirebaseToken, handleAnonymousUser } = require('../middleware/firebaseAuth');
const User = require('../models/user'); // Import your User model
const jwt = require('jsonwebtoken');

// Protected route using Firebase auth
router.get('/firebase-protected', verifyFirebaseToken, (req, res) => {
    res.status(200).json({
        message: 'Access granted with Firebase token',
        user: req.user, // Firebase user info
    });
});

// Handle Firebase authentication (including anonymous/guest)
router.post('/firebase-signup', verifyFirebaseToken, async (req, res) => {
    try {
        const { name, email, authProvider } = req.body;
        const firebaseUid = req.user.uid; // Get UID from verified token
        
        // Check if user already exists with this Firebase UID
        const existingUser = await User.findOne({ firebaseUid });
        
        if (existingUser) {
            // User exists, generate JWT token
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            
            return res.status(200).json({
                message: 'Authentication successful',
                token,
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    isGuest: existingUser.isGuest || false
                }
            });
        }
        
        // Determine if this is a guest user
        const isGuest = authProvider === 'anonymous' || req.user.firebase?.sign_in_provider === 'anonymous';
        
        // Create new user
        const userData = {
            name: isGuest ? 'Guest User' : (name || req.user.name || ''),
            email: isGuest ? `guest_${firebaseUid}@placeholder.com` : (email || req.user.email || ''),
            firebaseUid,
            isGuest,
            authProvider: authProvider || req.user.firebase?.sign_in_provider || 'unknown'
        };
        
        // If this is not an anonymous user and there's no password,
        // generate a random one (they'll use Firebase for auth anyway)
        if (!isGuest) {
            const randomPassword = Math.random().toString(36).slice(-8);
            const bcrypt = require('bcryptjs');
            userData.password = await bcrypt.hash(randomPassword, 10);
        }
        
        const newUser = new User(userData);
        await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isGuest: newUser.isGuest
            }
        });
        
    } catch (error) {
        console.error('Firebase signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
