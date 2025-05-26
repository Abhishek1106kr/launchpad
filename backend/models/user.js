// models/user.js - Updated user model to support Firebase
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: function() {
            // Email is required unless it's an anonymous user
            return this.authProvider !== 'anonymous';
        },
        unique: true,
        sparse: true, // Allows multiple null values
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            // Password is only required for email/password authentication
            return this.authProvider === 'email' || !this.authProvider;
        }
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
    firebaseUid: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null values
        required: function() {
            // Firebase UID is required for Firebase auth users
            return ['google', 'github', 'anonymous', 'firebase'].includes(this.authProvider);
        }
    },
    authProvider: {
        type: String,
        enum: ['email', 'google', 'github', 'anonymous', 'firebase'],
        default: 'email'
    },
    profilePicture: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ firebaseUid: 1 });

// Pre-save middleware to handle email uniqueness for non-anonymous users
userSchema.pre('save', function(next) {
    if (this.authProvider === 'anonymous') {
        this.email = undefined; // Remove email for anonymous users
    }
    next();
});

module.exports = mongoose.model('User', userSchema);