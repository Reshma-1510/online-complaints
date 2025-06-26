const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createComplaint, getComplaints, getComplaintById } = require('../controllers/complaintController');

router.post('/', auth, createComplaint);
router.get('/', auth, getComplaints);
router.get('/:id', auth, getComplaintById);

module.exports = router;
