const _ = require('lodash');
const dotenv = require('dotenv');


dotenv.config();

const environment = process.env.NODE_ENV || 'DEVELOPMENT';
// database configurations & secret key

const config = {
  DEVELOPMENT: {
    mongo: {
      url: process.env.DB_URI || 'mongodb://localhost:27017/ankart',
    },
  },
  PRODUCTION: {
    mongo: {
      url: process.env.DB_URI || 'xxxxx',
    },
  },
};

const others = {
  jwtSecret: 'osddjkkjo$H$OHO$iohoiah$$$%jjhhddk',
  msg91AuthKey: '234740A7i6CybXQa65b88c37a',
  port: process.env.PORT || 8080,
};

module.exports = _.merge(config[environment], others);
