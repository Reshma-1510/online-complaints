const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: String },
  text: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  status: { type: String, default: 'open' },
  messages: [messageSchema]
});

module.exports = mongoose.model('Complaint', complaintSchema);
