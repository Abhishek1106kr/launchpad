const express = require('express');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/verifyToken');
const Opportunity = require('../models/Opportunity');
const User = require('../models/user');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { opportunityId } = req.body;
  if (!opportunityId) return res.status(400).json({ error: "Opportunity ID required." });

  try {
    const user = await User.findById(req.user.id);
    const opportunity = await Opportunity.findById(opportunityId);
    if (!user || !opportunity) return res.status(404).json({ error: "User or opportunity not found." });

    // Set up Nodemailer transporter (use real credentials in production)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Opportunities Portal" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: `Application Confirmation: ${opportunity.title}`,
      text: `Hi ${user.name},\n\nYou have successfully applied for the position: ${opportunity.title} at ${opportunity.company}.\n\nThank you for using our platform!\n\nBest,\nOpportunities Portal Team`
    });

    res.json({ message: "Application email sent!" });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ error: "Failed to send application email." });
  }
});

module.exports = router;
