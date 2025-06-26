const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const authMiddleware = require('../middleware/auth');

// Create a new complaint (User)
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newComplaint = new Complaint({
            title,
            description,
            userId: req.user.id
        });
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Get all complaints for the logged-in user
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Get all complaints (Admin only)
router.get('/admin', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin access required.' });
    }
    try {
        const complaints = await Complaint.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Update complaint status (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin access required.' });
    }
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }
        complaint.status = req.body.status || complaint.status;
        await complaint.save();
        res.json(complaint);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

module.exports = router;