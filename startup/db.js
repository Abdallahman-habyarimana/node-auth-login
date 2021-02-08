const mongoose = require('mongoose');
const config = require('config');
const color = require('colors')

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
    .then(() => console.log(`Connected to ${db}...`.blue.bold));
}