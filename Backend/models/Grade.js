const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignmentName: { type: String, required: true },
  score: { type: Number, required: true },
  weight: { type: Number, default: 1 },
  dateGraded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grade', gradeSchema);
