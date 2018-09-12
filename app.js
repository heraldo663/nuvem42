require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')

const authRouter = require('./routes/api/auth');

const app = express();

app.use(passport.initialize());
require('./services/passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', authRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



module.exports = app;
