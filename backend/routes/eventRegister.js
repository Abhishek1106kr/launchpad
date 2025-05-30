const express = require('express');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/verifyToken');
const TrendingEvent = require('../models/TrendingEvent');
const User = require('../models/user');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) return res.status(400).json({ error: "Event ID required." });

  try {
    const user = await User.findById(req.user.id);
    const event = await TrendingEvent.findById(eventId);
    if (!user || !event) return res.status(404).json({ error: "User or event not found." });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Events Portal" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: `Registration Confirmation: ${event.title}`,
      text: `Hi ${user.name},\n\nYou have successfully registered for the event: ${event.title}.\n\nEvent Details:\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nThank you for using our platform!`
    });

    res.json({ message: "Registration email sent!" });
  } catch (err) {
    console.error("Event registration error:", err);
    res.status(500).json({ error: "Failed to send registration email." });
  }
});

module.exports = router;
