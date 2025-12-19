const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  instructorName: { type: String, required: true },
  avgGrade: { type: String, default: 'N/A' },
  schedule: { type: String },
});

module.exports = mongoose.model('Course', courseSchema);
