var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var DB = require('./DB/config');
var sessionOpts = {
  secret: 'S]}v7Bj?)QCb]hK-Gn;D&;cYd=A^&z{-c-;;CJSf~a+&d1,',
  resave: true,
  saveUninitialized: true
}

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use (session(sessionOpts));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("not found error")
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
