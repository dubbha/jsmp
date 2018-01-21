const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  img: Buffer,
});

module.exports = mongoose.model('User', userSchema);
