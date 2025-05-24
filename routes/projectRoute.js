const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// Get all publications
router.get('/', async (req, res) => {
  try {
    const Projects = await Project.find();
    res.json(Projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new publication
router.post('/', async (req, res) => {
  const newPub = new Project({
    Duration: req.body.Duration,
    Description: req.body.Description
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
    const pub = await Project.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Project not found' });

    await pub.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update publication by ID
router.put('/:id', async (req, res) => {
  const { Duration, Description } = req.body;

  try {
    const pub = await Project.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Project not found' });

    if (Duration !== undefined) pub.Duration = Duration;
    if (Description !== undefined) pub.Description = Description;

    const updated = await pub.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
