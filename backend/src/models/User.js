const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      // Not required if using OAuth only
    },
    googleId: {
      type: String,
      sparse: true,
    },
    linkedinId: {
      type: String,
      sparse: true,
    },
    skills: [String],
    resume: {
      filename: String,
      url: String,
    },
    preferences: {
      jobTypes: [String],
      locations: [String],
      remoteOnly: Boolean,
      salaryMin: Number,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;