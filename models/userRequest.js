const mongoose = require('mongoose');

const userRequestSchema = mongoose.Schema({
  phone: {
    type: Number,
    required: true,
  },
  otpcode: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const UserRequest = mongoose.model('UserSignupModel', userRequestSchema);

const addPhoneAndOtp = (userOtp, callback) => {
  const userotp = new UserRequest(userOtp);
  userotp.save(callback);
};

const getUserByOtp = (otpcode, callback) => {
  const query = { otpcode };
  UserRequest.findOne(query, callback);
};

const getUserbyNumber = (phone, callback) => {
  const query = { phone };
  UserRequest.findOne(query, callback);
};

const updateOtp = (userDetail, callback) => {
  const { phone, otpcode } = userDetail;
  const query = { phone };
  UserRequest.updateOne(query, { $set: { phone, otpcode, isVerified: false } }, callback);
};

const updateIsVerified = (updatedUserDetail, callback) => {
  const { phone, otpcode } = updatedUserDetail;
  const query = { phone };
  UserRequest.updateOne(query, { $set: { phone, otpcode, isVerified: true } }, callback);
};

module.exports = {
  UserRequest,
  getUserByOtp,
  addPhoneAndOtp,
  getUserbyNumber,
  updateOtp,
  updateIsVerified,
};
