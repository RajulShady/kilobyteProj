const dotenv = require('dotenv');

dotenv.config();
// database configurations & secret key
module.exports = {
  database: process.env.DB_URI || 'mongodb://localhost:27017/otpDb',
  secret: 'hhrrgghhii',
  port: process.env.PORT || 8080,
};
