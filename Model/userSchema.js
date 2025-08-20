const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: v => (typeof v === 'string' ? v.replace(/\s+/g, '') : v),
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
    },
    Otp: {
      type: Number,
    },
    Phone: {
      type: Number,
    },
    Address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
