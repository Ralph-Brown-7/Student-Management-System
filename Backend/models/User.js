const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'instructor', 'student'], required: true },
  status: { type: String, default: 'Active' },
  enrollmentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
