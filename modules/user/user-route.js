const express = require('express');

const router = express.Router();
const controller = require('./user-controller');
// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
// const { User, addUser } = require('../models/user');
// const {
//  UserRequest, addPhoneAndOtp, getUserbyNumber, updateOtp, updateIsVerified,
// } = require('../models/userRequest');
// const { addUserLogin, getUserByPhoneLogin } = require('../models/userRequestLogin');
// const { getOtp } = require('../utils/otpGenerator');


// declare variables
// let newUser = {};
// const loginUser = {};
// let userReqObj = {};
// let otpcode = getOtp();
// const otpcode2 = getOtp();
// const otpcodeLogin = getOtp();
// const userLogin = {};

// Singup route
router.post('/signup', (req, res) => {
  const data = { ...req.body };
  controller.signup(data, res);
});

// Signup Implementation
// newUser = new User({
//   name: req.body.name,
//   email: req.body.email,
//   phone: req.body.phone,
// });

// const phonenumber = req.body.phone;
// getUserbyNumber(newUser.phone, (err, user) => {
//   if (err) {
//     throw err;
//   } else if (!user) {
//     addUser(newUser, (error) => {
//       if (error) throw error;
//     });
//     const sendOtp = new SendOtp('234740A7i6CybXQa65b88c37a');
//     sendOtp.send(phonenumber, 'Kilobyte', otpcode, (error) => {
//       if (error) throw error;
//     });
//     userReqObj = new UserRequest({
//       phone: phonenumber,
//       otpcode,
//       isVerified: false,
//     });
//     addPhoneAndOtp(userReqObj, (error) => {
//       if (error) throw error;
//       res.send({ success: true, msg: 'Proceed to enter otp' });
//     });
//   } else if (user && user.isVerified === true) {
//     res.send({ success: false, msg: 'user already registered' });
//   } else {
//     const sendOtp = new SendOtp('234740A7i6CybXQa65b88c37a');
//     sendOtp.send(newUser.phone, 'Kilobyte', otpcode2, (error) => {
//       if (error) throw error;
//     });
//     userReqObj = {
//       phone: phonenumber,
//       otpcode: otpcode2,
//       isVerified: false,
//     };
//     otpcode = otpcode2;
//     updateOtp(userReqObj, (error) => {
//       if (error) throw error;
//     });
//     res.send({ success: true, msg: 'Otp sent' });
//   }
// });

router.post('/signup/verify', (req, res) => {
  const data = { ...req.body };
  controller.otpVerify(data, res);
});
// Signup OTP Verifcation
// const updatedUserDetail = {
//   phone: req.body.phone,
//   otpcode: req.body.otpcode,
// };
// getUserbyNumber(updatedUserDetail.phone, (err, user) => {
//   if (err) throw err;
//   // eslint-disable-next-line
//   if (user.otpcode == otpcode) {
//     updateIsVerified(updatedUserDetail, (error) => {
//       if (error) throw error;
//       const payload = {
//         phone: loginUser.phone,
//       };
//       const token = jwt.sign(payload, config.secret, {
//         expiresIn: 604800,
//       });

//       res.send({
//         success: true,
//         token: `JWT ${token}`,
//         msg: 'user Signed up',
//       });
//     });
//   } else {
//     res.send({ success: false, msg: 'Invalid OTP' });
//   }
// });

// nexmo implementation
// nexmo.verify.check({request_id: requestId, code: otpcodeSignup}, (err, result) => {
// if(err) {
//   res.send({success: false, msg: "unable to verify phone number"});
// } else {
//   if(result.status == '0') {
//     newUser.isVerified = true;
//     addUser(newUser, (err) => {
//       if (err) {
//         res.json({success: false, msg: 'Failed to register user'});
//       } else {
//       res.json({success: true, msg: 'User Successfully verified & Registered'});
//       }
//     });
//   } else {
//     res.send({success: false, msg: "unable to verify"});
//     }
//   }
// });


// login route
router.post('/login', (req, res) => {
  const data = { ...req.body };
  controller.login(data, res);
});

// Login Implementation
// const phoneNumber = req.body.phone;
// getUserbyNumber(phoneNumber, (err, user) => {
//   if (err) {
//     throw err;
//   } else if (user && user.isVerified === true) {
//     const sendOtp = new SendOtp('234740A7i6CybXQa65b88c37a');
//     sendOtp.send(phoneNumber, 'Kilobyte', otpcodeLogin, (error) => {
//       if (error) throw error;
//     });
//     userLogin = {
//       phone: phoneNumber,
//       otpcode: otpcodeLogin,
//     };
//     addUserLogin(userLogin, (error) => {
//       if (error) throw error;
//       res.send({ success: true, msg: 'user added to login database' });
//     });
//   } else {
//     res.send({ success: false, msg: 'Signup Again' });
//   }
// });


// Login otp verification
router.post('/login/verify', (req, res) => {
  const data = { ...req.body };
  controller.loginVerify(data, res);
});

// Login otp verification
// const loginUserDetail = {
//   phone: req.body.phone,
//   otpcode: req.body.otpcode,
// };
// getUserByPhoneLogin(loginUserDetail.phone, (err, user) => {
//   if (err) throw err;
//   // eslint-disable-next-line
//   if (user.otpcode == loginUserDetail.otpcode) {
//     res.send({ success: true, msg: 'User Logged in' });
//   } else {
//     res.send({ success: false, msg: 'Invalid OTP' });
//   }
// });

// nexmo implementation
// nexmo.verify.check({request_id: requestId, code: otpcodeLogin}, (err, result) => {
//   if(err) {
//     res.send({success: false, msg: "unable to verify phone number"});
//   } else{
//     if (result.status == "0") {
//       const payload = {
//         phone: loginUser.phone,
//       }
//       const token = jwt.sign(payload, config.secret, {
//         expiresIn: 604800
//       });

//       res.send({
//         success: true,
//         token: 'JWT '+token,
//         user: loginUser,
//         msg: "user logged in"
//       });
//     } else{
//       res.send({success: false, msg: "unable to login"});
//     }
//   }
// });


module.exports = router;
