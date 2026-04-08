const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const recruiterRoutes = require('./routes/recruiter');
const studentRoutes = require('./routes/student');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);

// Fallback to index.html for unknown routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

// Sync database and then create default admin if not exists
sequelize.sync().then(async () => {
  console.log('Database synced');
  const User = require('./models/User');
  const bcrypt = require('bcryptjs');
  
  const adminExists = await User.findOne({ where: { role: 'admin' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      role: 'admin',
      fullName: 'Placement Officer',
      email: 'admin@college.edu',
      password: hashedPassword
    });
    console.log('Default admin created: admin@college.edu / admin123');
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});
