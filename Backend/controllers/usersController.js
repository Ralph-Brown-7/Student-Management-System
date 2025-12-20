const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email and role are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      role,
      status: status || 'Active'
    });

    res.status(201).json({
      message: 'Registration successful',
      userId: user._id,
      role: user.role,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      role: user.role,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USERS
exports.getUsers = async (_req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET USER
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
