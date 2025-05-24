// models/ContactForm.js
const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  formLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ContactForm',contactFormSchema);
