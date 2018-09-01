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
    validate: [isEmail, 'Invalid Email'],
  },
  phone: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('UserModel', UserSchema);

// add new user to database
const addUser = (newUser, callback) => {
  const user = Object.assign(newUser);
  user.save(callback);
};

// search user by Phone number
const getUserByPhone = (phone, callback) => {
  const query = { phone };
  User.findOne(query, callback);
};

module.exports = {
  User,
  getUserByPhone,
  addUser,
};
