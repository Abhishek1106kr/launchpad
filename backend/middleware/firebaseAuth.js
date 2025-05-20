// middleware/firebaseAuth.js (Updated)

const admin = require('../config/firebase');

// Middleware to verify Firebase authentication token
const verifyFirebaseToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authorization.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// New middleware to handle anonymous users specially if needed
const handleAnonymousUser = async (req, res, next) => {
    // Only proceed if we have a verified Firebase user
    if (!req.user) {
        return next();
    }
    
    // If this is an anonymous user, add a flag
    if (req.user.firebase && req.user.firebase.sign_in_provider === 'anonymous') {
        req.user.isAnonymous = true;
    }
    
    next();
};

module.exports = { verifyFirebaseToken, handleAnonymousUser };
