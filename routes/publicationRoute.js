const express = require('express');
const router = express.Router();
const Publication = require('../models/publicationModel');

// Get all publications
router.get('/', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new publication
router.post('/', async (req, res) => {
  const newPub = new Publication({
    year: req.body.year,
    researchers: req.body.researchers,
    publication: req.body.publication
  });

  try {
    const saved = await newPub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete publication by ID
router.delete('/:id', async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found' });

    await pub.deleteOne();
    res.json({ message: 'Publication deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update publication by ID
router.put('/:id', async (req, res) => {
  const { year, researchers, publication } = req.body;

  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found' });

    if (year !== undefined) pub.year = year;
    if (researchers !== undefined) pub.researchers = researchers;
    if (publication !== undefined) pub.publication = publication;

    const updated = await pub.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
