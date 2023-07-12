
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cosplayRouter = require('./routes/cosplays')

const { errorHandler } = require('./middleware/error.handler');

const app = express();

const MongoDBConnection = process.env.MONGO_CONNECTION

// MongoDB Connection
mongoose.connect(MongoDBConnection, {
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
app.use('/cosplays', cosplayRouter)

app.use(errorHandler)


module.exports = app;
