const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin', 'agent'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
