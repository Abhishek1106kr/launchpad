const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// GET profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE profile (now with onboarding fields)
router.put("/", verifyToken, async (req, res) => {
  const {
    github,
    linkedin,
    bio,
    avatar,
    motivation,
    skills,
    careerGoals,
    dreamCompany,
    favoriteProject,
    location
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        github,
        linkedin,
        bio,
        avatar,
        motivation,
        skills,
        careerGoals,
        dreamCompany,
        favoriteProject,
        location
      },
      { new: true, runValidators: true }
    ).select("-password -__v");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Add certificate (name + url)
router.post('/certificate-url', verifyToken, async (req, res) => {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "Name and URL required" });
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { certificates: { name, url } } },
      { new: true }
    );
    res.json({ message: "Certificate added" });
  });
  
  // Remove certificate (by url)
  router.delete('/certificate-url', verifyToken, async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { certificates: { url } } },
      { new: true }
    );
    res.json({ message: "Certificate removed" });
  });
  
  // Set resume URL
  router.post('/resume-url', verifyToken, async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });
    await User.findByIdAndUpdate(
      req.user.id,
      { resume: url },
      { new: true }
    );
    res.json({ message: "Resume URL set" });
  });
  

module.exports = router;
