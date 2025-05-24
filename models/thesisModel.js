const mongoose = require('mongoose');

const thesisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  period: { type: String, required: true },
  thesis: { type: String, required: true },
  institution: { type: String, required: true },
  img: { type: String } // filename of uploaded image
}, {
  timestamps: true
});

module.exports = mongoose.model('Thesis', thesisSchema);
