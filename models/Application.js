const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Applied' // Applied, Shortlisted, Interviewing, Offered, Rejected
  },
  score: {
    type: DataTypes.STRING,
    defaultValue: 'New'
  }
});

Application.belongsTo(User, { as: 'Student', foreignKey: 'studentId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });
User.hasMany(Application, { foreignKey: 'studentId' });
Job.hasMany(Application, { foreignKey: 'jobId' });

module.exports = Application;
