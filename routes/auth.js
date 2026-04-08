const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { role, fullName, email, password, registerNumber, phone, company } = req.body;
        
        // Basic validation
        if (!role || !fullName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userInput = {
            role, fullName, email, password: hashedPassword,
            status: role === 'recruiter' ? 'Pending' : 'Approved'
        };

        if (role === 'student') {
            userInput.registerNumber = registerNumber;
            userInput.phone = phone;
        } else if (role === 'recruiter') {
            userInput.company = company;
        }

        const newUser = await User.create(userInput);
        res.status(201).json({ message: 'Registration successful', status: userInput.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ where: { email, role } });
        
        if (!user) return res.status(401).json({ error: 'Invalid credentials or role' });
        
        if (user.role === 'recruiter' && user.status !== 'Approved') {
            return res.status(403).json({ error: `Account is ${user.status}. Awaiting admin action.` });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, 'your_jwt_secret', { expiresIn: '1d' });
        
        res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
