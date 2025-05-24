// models/researchInterest.js
const mongoose = require('mongoose');

const researchInterestSchema = new mongoose.Schema({
  Interest: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ResearchInterest', researchInterestSchema);
