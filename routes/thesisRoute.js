const express = require('express');
const Thesis = require('../models/thesisModel');
const upload = require('../middleware.js/upload');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// POST: Create thesis with image
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, period, thesis, institution } = req.body;
    const img = req.file?.filename;

    const newEntry = new Thesis({ name, period, thesis, institution, img });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All thesis entries
router.get('/', async (req, res) => {
  const items = await Thesis.find().sort({ createdAt: -1 });
  res.json(items);
});

// DELETE: Remove thesis and image
router.delete('/:id', async (req, res) => {
  const thesis = await Thesis.findById(req.params.id);
  if (!thesis) return res.status(404).json({ message: 'Not found' });

  if (thesis.img) {
    fs.unlink(path.join('uploads/thesis/', thesis.img), () => {});
  }

  await Thesis.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});


router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    const { name, period, thesis, institution } = req.body;
    const newImage = req.file?.filename;

    const existing = await Thesis.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    // If a new image is uploaded, remove the old one
    if (newImage && existing.img) {
      fs.unlink(path.join('uploads/thesis/', existing.img), () => {});
    }

    const updated = await Thesis.findByIdAndUpdate(
      req.params.id,
      {
        name,
        period,
        thesis,
        institution,
        img: newImage || existing.img, // retain old image if no new image uploaded
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
