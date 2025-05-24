const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

const pubRoutes = require('./routes/publicationRoute');
app.use('/api/publications', pubRoutes);
const researchInterest = require('./routes/researchInterestRoute');
app.use('/api/researchinterest', researchInterest);
const project = require('./routes/projectRoute');
app.use('/api/projects', project);
const contact = require('./routes/contactFormRoutes');
app.use('/api/contact', contact);
const thesisRoutes = require('./routes/thesisRoute');
app.use('/api/thesis', thesisRoutes);


// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
