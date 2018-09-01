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

const addPhoneAndOtp = (userOtp) => {
  const userotp = new UserRequest(userOtp);
  return userotp.save();
};

const getUserByOtp = (otpcode) => {
  const query = { otpcode };
  return UserRequest.findOne(query);
};

const getUserbyNumber = (phone) => {
  const query = { phone };
  return UserRequest.findOne(query);
};

const updateOtp = (userDetail) => {
  const { phone, otpcode } = userDetail;
  const query = { phone };
  UserRequest.updateOne(query, { $set: { phone, otpcode, isVerified: false } });
};

const updateIsVerified = (updatedUserDetail) => {
  const { phone, otpcode } = updatedUserDetail;
  const query = { phone };
  UserRequest.updateOne(query, { $set: { phone, otpcode, isVerified: true } });
};

module.exports = {
  UserRequest,
  getUserByOtp,
  addPhoneAndOtp,
  getUserbyNumber,
  updateOtp,
  updateIsVerified,
};
