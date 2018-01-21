const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  birthYear: Number,
});

module.exports = mongoose.model('User', userSchema);
