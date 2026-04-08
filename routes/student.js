const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

const router = express.Router();

router.use(authenticate, authorize(['student']));

// Get all Live jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { status: 'Live' },
            include: [{ model: User, as: 'Recruiter', attributes: ['company'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Apply to a job
router.post('/jobs/:id/apply', async (req, res) => {
    try {
        const existing = await Application.findOne({ where: { studentId: req.user.id, jobId: req.params.id } });
        if (existing) return res.status(400).json({ error: 'Already applied' });
        
        const application = await Application.create({
            studentId: req.user.id,
            jobId: req.params.id,
            status: 'Applied'
        });
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// View applied jobs
router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.findAll({
            where: { studentId: req.user.id },
            include: [{
                model: Job,
                include: [{ model: User, as: 'Recruiter', attributes: ['company'] }]
            }]
        });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Student dashboard stats
router.get('/dashboard', async (req, res) => {
    try {
        const activeApplications = await Application.count({ where: { studentId: req.user.id } });
        res.json({ activeApplications });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
