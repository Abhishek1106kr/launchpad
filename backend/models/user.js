// models/user.js (Updated to include guest user fields)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        // Only required for regular users, not for Firebase/OAuth users
        required: function() {
            return !this.firebaseUid;
        }
    },
    phone: {
        type: String,
        // Make phone optional for guest users
        required: function() {
            return !this.isGuest;
        },
        default: ''
    },
    firebaseUid: {
        type: String,
        sparse: true,
        unique: true
    },
    authProvider: {
        type: String,
        enum: ['local', 'google', 'github', 'anonymous'],
        default: 'local'
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
