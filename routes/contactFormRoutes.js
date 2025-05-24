// routes/contactFormRoutes.js
const express=require("express")
const ContactForm = require('../models/contactFormModel.js');

const router = express.Router();

// GET the latest form link
router.get('/', async (req, res) => {
  const latest = await ContactForm.findOne().sort({ createdAt: -1 });
  res.json(latest);
});

// POST a new form link
router.post('/', async (req, res) => {
  const { formLink } = req.body;
  const newEntry = new ContactForm({ formLink });
  await newEntry.save();
  res.status(201).json(newEntry);
});

module.exports = router;
