const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

const router = express.Router();

router.use(authenticate, authorize(['recruiter']));

// Post a new job
router.post('/jobs', async (req, res) => {
    try {
        const recruiter = await User.findByPk(req.user.id);
        if (recruiter.status !== 'Approved') {
            return res.status(403).json({ error: 'Recruiter not approved yet' });
        }
        
        const newJob = await Job.create({
            ...req.body,
            recruiterId: req.user.id
        });
        
        res.status(201).json(newJob);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a job status (Draft to Live, etc)
router.put('/jobs/:id/status', async (req, res) => {
    try {
        const job = await Job.findOne({ where: { id: req.params.id, recruiterId: req.user.id } });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        
        job.status = req.body.status;
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get recruiter's jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { recruiterId: req.user.id }, order: [['createdAt', 'DESC']] });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get pipeline stats for a job
router.get('/pipeline', async (req, res) => {
    try {
        const applications = await Application.findAll({
            include: [{
                model: Job,
                where: { recruiterId: req.user.id }
            }, {
                model: User,
                as: 'Student',
                attributes: ['fullName', 'email', 'registerNumber']
            }]
        });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
