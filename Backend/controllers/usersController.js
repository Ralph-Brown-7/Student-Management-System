const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * ======================
 * REGISTER USER
 * ======================
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // Basic validation
    if (!name || !email || !role) {
      return res.status(400).json({
        message: 'Name, email, and role are required',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      role,
      status: status || 'Active',
    });

    // IMPORTANT: frontend expects these values
    res.status(201).json({
      message: 'Registration successful',
      userId: user._id,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * ======================
 * LOGIN USER
 * ======================
 */
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // IMPORTANT: frontend expects these values
    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * ======================
 * GET ALL USERS
 * ======================
 */
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ======================
 * GET SINGLE USER
 * ======================
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ======================
 * UPDATE USER
 * ======================
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ======================
 * DELETE USER
 * ======================
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
