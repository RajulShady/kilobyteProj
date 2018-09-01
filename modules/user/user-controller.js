const jwt = require('jsonwebtoken');
const config = require('../../config/configurations');
const { sendOtp, verifyOtp } = require('../../utils/sendOTP');
const { addUser, getUserByPhone } = require('./user-model');

const signup = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    const user = await getUserByPhone(userDetail.phone);
    if (!user) {
      userDetail.isVerified = false;
      await addUser(userDetail);
      console.log(userDetail.phone);
      sendOtp(userDetail.phone);
      res.send({ success: true, msg: 'Otp Sent Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: 'Internal server error' });
  }
};

const otpVerify = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    if (!userDetail.phone || !userDetail.otp) {
      res.send({ success: false, msg: 'Invalid Details' });
    }
    const user = await getUserByPhone(userDetail.phone);
    if (user) {
      const verifyResult = await verifyOtp(userDetail.phone, userDetail.otp);
      console.log(verifyResult);
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
        res.send({ success: false, msg: 'Invalid Otp' });
      }
    } else {
      res.send({ success: false, msg: 'Record does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: 'Internal server error' });
  }
  return 1;
};

const login = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    const user = await getUserByPhone(userDetail.phone);
    if (!user) {
      res.send({ success: false, msg: 'User not registered' });
    } else if (user.isVerified === false) {
      res.send({ success: false, msg: 'Register Again' });
    } else {
      sendOtp(userDetail.phone);
      res.send({ success: true, msg: 'Otp Sent Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: 'Internal server error' });
  }
};

const loginVerify = async (data, res) => {
  try {
    const userDetail = Object.assign(data);
    if (!userDetail.phone || !userDetail.otp) {
      res.send({ success: false, msg: 'Invalid Details' });
    }
    const user = await getUserByPhone(userDetail.phone);
    if (user) {
      const verifyResult = await verifyOtp(userDetail.phone, userDetail.otp);
      if (verifyResult.type === 'success') {
        res.send({ success: true, msg: 'User Loggedin' });
      } else {
        res.send({ success: false, msg: 'Invalid Otp' });
      }
    } else {
      res.send({ success: false, msg: 'Record Does not found' });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: 'Internal server error' });
  }
};

module.exports = {
  signup,
  otpVerify,
  login,
  loginVerify,
};
