const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.ENUM('student', 'recruiter', 'admin'),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Student specific
  registerNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Recruiter specific
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    // For recruiters: Pending, Approved, Hold
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  },
  approvalId: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;
