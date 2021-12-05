const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function() {
  console.log('Connected to database :: MongoDB');
})

module.exports = db;