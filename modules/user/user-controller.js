const jwt = require('jsonwebtoken');
const config = require('../../config/configurations');
const { sendOtp, verifyOtp } = require('../../utils/sendOTP');
const { getUserByPhone, addUser } = require('./user-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
// const mongoService = require('../../services/mongoService');

const signup = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    const phoneNumber = userDetail.phone;
    const user = await getUserByPhone(phoneNumber);
    if (!user) {
      userDetail.isVerified = false;
      await addUser(userDetail);
      sendOtp(userDetail.phone);
      res.send({ success: true, msg: SuccessMessages.OTP_SENT_MSG });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

const otpVerify = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    if (!userDetail.phone || !userDetail.otp) {
      res.send({ success: false, msg: ErrorMessages.MISSING_CREDENTIALS });
    }
    const user = await getUserByPhone(userDetail.phone);
    if (user) {
      const verifyResult = await verifyOtp(userDetail.phone, userDetail.otp);
      if (verifyResult.type === 'success') {
        if (!user.isVerified) user.isVerified = true;
        await user.save();
        const payload = {
          phone: userDetail.phone,
          date: new Date(),
        };
        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 604800,
        });
        res.send({
          success: true,
          token: `JWT ${token}`,
          msg: 'user Signed up',
        });
      } else {
        res.send({ success: false, msg: ErrorMessages.INVALID_OTP });
      }
    } else {
      res.send({ success: false, msg: ErrorMessages.USER_NOT_FOUND });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
  return 1;
};

const login = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    const user = await getUserByPhone(userDetail.phone);
    if (!user) {
      res.send({ success: false, msg: ErrorMessages.USER_NOT_FOUND });
    } else if (user.isVerified === false) {
      res.send({ success: false, msg: ErrorMessages.UNAUTHORIZED });
    } else {
      sendOtp(userDetail.phone);
      res.send({ success: true, msg: SuccessMessages.OTP_SENT_MSG });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

const loginVerify = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    if (!userDetail.phone || !userDetail.otp) {
      res.send({ success: false, msg: ErrorMessages.INVALID_DETAILS });
    }
    const user = await getUserByPhone(userDetail.phone);
    if (user) {
      const verifyResult = await verifyOtp(userDetail.phone, userDetail.otp);
      if (verifyResult.type === 'success') {
        res.send({ success: true, msg: SuccessMessages.LOGGEDIN_MSG });
      } else {
        res.send({ success: false, msg: ErrorMessages.INVALID_OTP });
      }
    } else {
      res.send({ success: false, msg: ErrorMessages.USER_NOT_FOUND });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  signup,
  otpVerify,
  login,
  loginVerify,
};
