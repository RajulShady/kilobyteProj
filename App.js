const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/configurations');
const userRoute = require('./modules/user/user-route');

// Database connections
console.log(config.mongo.url);
mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  console.log(`Database connected at ${config.port}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

// MiddleWares
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

// Routes
app.use('/user', userRoute);
app.get('/', (req, res) => {
  res.json({ message: 'Not a place to visit' });
});

// server listening at port
app.listen(config.port);
