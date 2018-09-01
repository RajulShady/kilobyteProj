const mongoose = require('mongoose');
const { isEmail } = require('validator');

// model for new user
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

// add new user to database
const addUser = (newUser) => {
  const user = new User(newUser);
  return user.save();
};

// search user by Phone number
const getUserByPhone = (phone) => {
  const query = { phone };
  return User.findOne(query);
};

module.exports = {
  User,
  getUserByPhone,
  addUser,
};
