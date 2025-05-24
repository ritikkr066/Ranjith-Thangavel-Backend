const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  year: String,
  researchers: [String],
  publication: String
});

module.exports = mongoose.model('Publication', publicationSchema);
