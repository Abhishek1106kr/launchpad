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
        
        // Add user information to request object
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email || null,
            name: decodedToken.name || null,
            picture: decodedToken.picture || null,
            provider: decodedToken.firebase?.sign_in_provider || 'unknown',
            isAnonymous: decodedToken.firebase?.sign_in_provider === 'anonymous'
        };
        
        console.log('Firebase token verified for user:', req.user.uid);
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(401).json({ 
            error: 'Unauthorized: Invalid token',
            details: error.message 
        });
    }
};

// Middleware to handle anonymous users specially if needed
const handleAnonymousUser = async (req, res, next) => {
    // Only proceed if we have a verified Firebase user
    if (!req.user) {
        return next();
    }
    
    // If this is an anonymous user, add special handling
    if (req.user.isAnonymous) {
        req.user.email = null; // Ensure anonymous users don't have emails
        req.user.name = req.user.name || 'Guest User';
    }
    
    next();
};

// Middleware to ensure user is not anonymous (for protected routes)
const requireNonAnonymousUser = (req, res, next) => {
    if (req.user && req.user.isAnonymous) {
        return res.status(403).json({ 
            error: 'This action requires a full account. Please sign up or log in.' 
        });
    }
    next();
};

module.exports = { 
    verifyFirebaseToken, 
    handleAnonymousUser, 
    requireNonAnonymousUser 
};