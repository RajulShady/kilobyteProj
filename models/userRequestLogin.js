const mongoose = require('mongoose');

const userRequestLoginSchema = mongoose.Schema({
  phone: {
    type: Number,
    required: true,
  },
  otpcode: {
    type: Number,
    required: true,
  },
});

const UserRequestLogin = mongoose.model('UserLoginModel', userRequestLoginSchema);

// add new user to login database
const addUserLogin = (newUser) => {
  const user = new UserRequestLogin(newUser);
  return user.save();
};

// search user by Phone number
const getUserByPhoneLogin = (phone) => {
  const query = { phone };
  return UserRequestLogin.findOne(query).sort({ $natural: -1 });
};


module.exports = {
  UserRequestLogin,
  getUserByPhoneLogin,
  addUserLogin,
};
