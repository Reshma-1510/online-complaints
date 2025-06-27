const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Pending' },
  user: String,
  assignedAgent: String
});

module.exports = mongoose.model('Complaint', complaintSchema);

