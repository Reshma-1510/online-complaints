const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintController');

router.post('/complaints', controller.createComplaint);
router.get('/complaints', controller.getAllComplaints);
router.put('/complaints/:id/status', controller.updateStatus);

module.exports = router;
