const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.use(authenticate, authorize(['admin']));

// Get all recruiters
router.get('/recruiters', async (req, res) => {
    try {
        const recruiters = await User.findAll({ where: { role: 'recruiter' } });
        res.json(recruiters);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Approve or reject
router.post('/recruiters/:id/status', async (req, res) => {
    try {
        const { status } = req.body; // 'Approved', 'Hold', 'Rejected'
        const recruiter = await User.findByPk(req.params.id);
        
        if (!recruiter || recruiter.role !== 'recruiter') {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        recruiter.status = status;
        if (status === 'Approved' && !recruiter.approvalId) {
            recruiter.approvalId = `SP-APR-${Math.floor(10000 + Math.random() * 90000)}`;
        }
        await recruiter.save();
        res.json(recruiter);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin stats
router.get('/stats', async (req, res) => {
    try {
        const totalCompanies = await User.count({ where: { role: 'recruiter' } });
        const approvedCompanies = await User.count({ where: { role: 'recruiter', status: 'Approved' } });
        const pendingCompanies = await User.count({ where: { role: 'recruiter', status: 'Pending' } });
        res.json({ totalCompanies, approvedCompanies, pendingCompanies });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
