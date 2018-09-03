const mongoose = require('mongoose');
const { isEmail } = require('validator');

// MODEL FOR NEW USER
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 5,
    validate: [isEmail, 'Invalid Email'],
  },
  phone: {
    type: Number,
    required: true,
    min: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('UserModel', UserSchema);

// ADD NEW USER TO DATABASE
const addUser = (newUser) => {
  const user = new User(newUser);
  return user.save();
};

// SEARCH USER BY PHONE NUMBER
const getUserByPhone = (phone) => {
  const query = { phone };
  return User.findOne(query);
};

module.exports = {
  User,
  getUserByPhone,
  addUser,
};
