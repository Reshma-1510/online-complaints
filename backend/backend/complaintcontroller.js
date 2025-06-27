const Complaint = require('../models/Complaint');

// Submit complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints (admin)
exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
};

// Update complaint status (agent)
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
  res.json(complaint);
};
