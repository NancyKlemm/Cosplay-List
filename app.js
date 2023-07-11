
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const cors = require("cors")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/cosplay-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection with MongoDB was successfully");
}).catch((error) => {
  console.error("Connection with MongoDB failed", error);
})

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
