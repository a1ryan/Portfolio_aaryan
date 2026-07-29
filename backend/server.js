// Minimal backend for the portfolio site.
// Right now it only handles the contact form. Add more routes/features as needed.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Where submissions are stored until you wire up real email/DB.
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

function readMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) return [];
  return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
}

function saveMessage(entry) {
  const messages = readMessages();
  messages.push(entry);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Contact form handler
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are all required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const entry = { name, email, message, receivedAt: new Date().toISOString() };

  // For now, submissions are just logged + saved to messages.json.
  // TODO: swap this for a real email send (e.g. nodemailer) or a database insert
  // once you're ready to wire that up. Keeping this here just as a stub:
  //
  //   const nodemailer = require('nodemailer');
  //   const transporter = nodemailer.createTransport({ ... });
  //   await transporter.sendMail({ to: process.env.CONTACT_EMAIL_TO, ... });
  //
  console.log('New contact form submission:', entry);
  saveMessage(entry);

  res.status(200).json({ message: "Thanks! I'll get back to you soon." });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
