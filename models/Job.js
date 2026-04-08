const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  track: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  package: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openings: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: true // Stored as comma separated string
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Live' // 'Live', 'Draft', 'Closed'
  }
});

Job.belongsTo(User, { as: 'Recruiter', foreignKey: 'recruiterId' });
User.hasMany(Job, { foreignKey: 'recruiterId' });

module.exports = Job;
