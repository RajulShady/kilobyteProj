const _ = require('lodash.merge');
const dotenv = require('dotenv');
const { OtherStrings } = require('../constants');

dotenv.config();

const environment = process.env.NODE_ENV || 'DEVELOPMENT';
// database configurations & secret key

const config = {
  DEVELOPMENT: {
    mongo: {
      url: process.env.DB_URI || OtherStrings.DEVELOPMENT_DATABASE,
    },
  },
  PRODUCTION: {
    mongo: {
      url: process.env.DB_URI || OtherStrings.PRODUCTION_DATABASE,
    },
  },
};

const others = {
  jwtSecret: OtherStrings.JWT_SECRETKEY,
  msg91AuthKey: OtherStrings.MSG91_AUTH_KEY,
  port: process.env.PORT || OtherStrings.DB_PORT,
};

module.exports = _(config[environment], others);
