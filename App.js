const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/configurations');
const userRoute = require('./modules/user/user-route');
const { ErrorMessages } = require('./constants');

// DATABASE CONNECTIONS
mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  console.log(`Database connected at ${config.port}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

// MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: 'true',
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
}));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ROUTES
app.use('/user', userRoute);
app.get('*', (req, res) => {
  res.send({ message: ErrorMessages.INVALID_ENDPOINT });
});

// SERVER LISTENING AT PORT
app.listen(config.port);
