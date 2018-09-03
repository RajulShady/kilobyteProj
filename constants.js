const SuccessMessages = {
  SIGNUP_SUCCESS_MSG: 'You have successfully signed in.',
  ENTEROTP_MSG: 'Proceed to enter otp.',
  OTP_SENT_MSG: 'Otp has been sent successfully.',
  LOGGEDIN_MSG: 'You have logged in successfully.',
};

const ErrorMessages = {
  ALREADY_REGISTERED_USER: 'User already registered.',
  MISSING_CREDENTIALS: 'Missing credentials',
  UNAUTHORIZED: 'Unauthorized',
  USER_NOT_FOUND: 'User does not exist',
  INVALID_OTP: 'Invalid OTP',
  INVALID_ENDPOINT: 'Try some other Endpoint',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  INVALID_DETAILS: 'Invalid Details',
};

const OtherStrings = {
  DEVELOPMENT_DATABASE: 'mongodb://localhost:27017/ankart',
  PRODUCTION_DATABASE: 'XXXX',
  JWT_SECRETKEY: 'osddjkkjo$H$OHO$iohoiah$$$%jjhhddk',
  MSG91_AUTH_KEY: '234740A7i6CybXQa65b88c37a',
  DB_PORT: 8080,
};

module.exports = {
  SuccessMessages,
  ErrorMessages,
  OtherStrings,
};
