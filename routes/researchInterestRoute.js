const express = require('express');
const router = express.Router();
const ResearchInterest = require('../models/researchInterestModel');

// GET the latest Interest entry
// GET all Interest entries
router.get('/', async (req, res) => {
  try {
    const allEntries = await ResearchInterest.find().sort({ createdAt: -1 }); // optional: sort latest first
    res.json(allEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST new Interest
router.post('/', async (req, res) => {
  const { Interest } = req.body;

  if (!Interest) return res.status(400).json({ message: 'Interest is required' });

  const newEntry = new ResearchInterest({ Interest });

  try {
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update by ID
router.put('/:id', async (req, res) => {
  const { Interest } = req.body;

  try {
    const entry = await ResearchInterest.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    if (Interest !== undefined) entry.Interest = Interest;

    const updated = await entry.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const entry = await ResearchInterest.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    await entry.deleteOne();
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
