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
const addUserLogin = (newUser, callback) => {
  const user = new UserRequestLogin(newUser);
  user.save(callback);
};

// search user by Phone number
const getUserByPhoneLogin = (phone, callback) => {
  const query = { phone };
  UserRequestLogin.findOne(query, callback).sort({ $natural: -1 });
};


module.exports = {
  UserRequestLogin,
  getUserByPhoneLogin,
  addUserLogin,
};
