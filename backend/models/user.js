// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  github: String,
  linkedin: String,
  bio: String,
  certificates: [
    {
      name: String,
      url: String
    }
  ],
  resume: String,
  
    
  motivation: String,
  skills: [String],
  careerGoals: String,
  dreamCompany: String,
  favoriteProject: String,
  location: String,
});

module.exports = mongoose.model("User", userSchema);
