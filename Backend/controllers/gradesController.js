const Grade = require('../models/Grade');

// CREATE
exports.createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getGrades = async (_req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'name')
      .populate('courseId', 'name');
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('studentId', 'name')
      .populate('courseId', 'name');

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteGrade = async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
