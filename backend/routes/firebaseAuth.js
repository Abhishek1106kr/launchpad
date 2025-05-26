// routes/firebaseAuth.js - New route file
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyFirebaseToken, handleAnonymousUser } = require('../middleware/firebaseAuth');
const User = require('../models/user'); // Adjust path to your user model
const router = express.Router();

// Route to handle Firebase token exchange and user creation/login
router.post('/firebase-signup', verifyFirebaseToken, handleAnonymousUser, async (req, res) => {
    try {
        const { uid, email, name, picture } = req.user;
        const { authProvider } = req.body;
        
        // Check if user already exists in your database
        let user = await User.findOne({ 
            $or: [
                { firebaseUid: uid },
                { email: email }
            ]
        });

        if (!user) {
            // Create new user for Firebase authentication
            const userData = {
                firebaseUid: uid,
                name: name || req.body.name || 'User',
                authProvider: authProvider || 'firebase',
            };

            // Only add email if it exists (anonymous users don't have email)
            if (email) {
                userData.email = email;
            }

            // Add phone as empty string if not provided (to match your schema)
            userData.phone = req.body.phone || '';

            user = await User.create(userData);
            console.log('New Firebase user created:', user);
        } else {
            // Update existing user's Firebase UID if needed
            if (!user.firebaseUid) {
                user.firebaseUid = uid;
                user.authProvider = authProvider || 'firebase';
                await user.save();
            }
            console.log('Existing user found:', user);
        }

        // Generate JWT token for your application
        const token = jwt.sign(
            { 
                id: user._id,
                firebaseUid: uid,
                authProvider: user.authProvider 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email || null,
                authProvider: user.authProvider
            }
        });

    } catch (error) {
        console.error('Firebase auth error:', error);
        res.status(500).json({ 
            error: 'Internal server error during Firebase authentication',
            details: error.message 
        });
    }
});

// Route to handle token exchange only (for existing users)
router.post('/firebase-login', verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, email } = req.user;
        
        // Find user by Firebase UID or email
        const user = await User.findOne({ 
            $or: [
                { firebaseUid: uid },
                { email: email }
            ]
        });

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found. Please sign up first.' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                firebaseUid: uid,
                authProvider: user.authProvider 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email || null,
                authProvider: user.authProvider
            }
        });

    } catch (error) {
        console.error('Firebase login error:', error);
        res.status(500).json({ 
            error: 'Internal server error during Firebase login',
            details: error.message 
        });
    }
});

module.exports = router;