// backend/routes/auth.js (Example backend route)
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Route to handle Firebase signup and token exchange
router.post('/firebase-signup', verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { authProvider } = req.body;

    // Example of creating a JWT token
    const token = jwt.sign(
      { 
        uid, 
        email, 
        authProvider 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(200).json({ 
      token,
      user: {
        uid,
        email,
        provider: authProvider
      }
    });
  } catch (error) {
    console.error('Error in Firebase signup:', error);
    return res.status(500).json({ message: 'Server error during authentication' });
  }
});

module.exports = router;