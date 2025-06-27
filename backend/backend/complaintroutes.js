const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintController');

router.post('/complaints', controller.createComplaint);
router.get('/complaints', controller.getAllComplaints);
router.put('/complaints/:id/status', controller.updateStatus);

module.exports = router;






exports.createComplaint = async (req, res) => {
  const { title, description } = req.body;
  const filePath = req.file?.path;

  const complaint = await Complaint.create({
    title,
    description,
    user: req.user.userId,
    evidence: filePath
  });

  res.status(201).json(complaint);
};
