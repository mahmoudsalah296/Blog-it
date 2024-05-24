const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false, default: '' },
  bio: { type: String, required: false, default: '' },
  joinedAt: { type: Date, default: Date.now },
  isAdmin: {type: Boolean, default: false},
});

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
