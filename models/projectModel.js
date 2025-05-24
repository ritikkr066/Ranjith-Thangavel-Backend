const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  Duration: String,
  Description: String
});

module.exports = mongoose.model('Project',projectSchema );
