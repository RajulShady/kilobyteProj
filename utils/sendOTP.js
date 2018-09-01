const SendOtp = require('sendotp');
const { msg91AuthKey } = require('../config/configurations');

const sendotp = new SendOtp(msg91AuthKey);

const sendOtp = (phonenumber) => {
  sendotp.send(phonenumber, 'Kilobyte', (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('Data>>>', data);
  });
};

const verifyOtp = (phoneNumber, otp) => new Promise((resolve, reject) => {
  sendotp.verify(phoneNumber, otp, (error, data) => {
    if (error) {
      return reject(error);
    }
    return resolve(data);
  });
});
module.exports = { sendOtp, verifyOtp };
