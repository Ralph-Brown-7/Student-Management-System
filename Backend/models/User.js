const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true // Ensures emails are stored consistently
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'instructor', 'student'], 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Active' 
  },
  enrollmentDate: { 
    type: Date, 
    default: Date.now 
  },
});

// This helper hides the password field whenever the user object is converted to JSON
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);