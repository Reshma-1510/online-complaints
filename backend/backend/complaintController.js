const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id,
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getComplaints = async (req, res) => {
  const role = req.user.role;
  const id = req.user.id;

  try {
    const complaints = role === 'user'
      ? await Complaint.find({ userId: id })
      : await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    res.json(complaint);
  } catch (err) {
    res.status(404).json({ message: 'Complaint not found' });
  }
};
