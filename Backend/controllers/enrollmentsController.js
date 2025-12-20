const Enrollment = require('../models/Enrollment');

// CREATE
exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getEnrollments = async (_req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', 'name email')
      .populate('courseId', 'name');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate('courseId', 'name');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteEnrollment = async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
