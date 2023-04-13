// Import the required packages and modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()


// Import the database connection object and sync the models with the database
var db = require("./models");
db.sequelize.sync({ force: false })

// db.sequelize.sync({ force: true })

// Set up the Express app
var app = express();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addRouter = require('./routes/add');
var subtractRouter = require('./routes/subtract');
var multiplyRouter = require('./routes/multiply');
var divideRouter = require('./routes/divide');
var authRouter = require('./routes/auth');
var previousRouter = require('./routes/previous');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up middleware for request logging and parsing cookies and request bodies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', authRouter);
app.use('/', indexRouter);    
app.use('/users', usersRouter);

app.use('/add', addRouter);
app.use('/subtract', subtractRouter);
app.use('/multiply', multiplyRouter);
app.use('/divide', divideRouter);
app.use('/previous', previousRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Add request object to locals
  res.locals.request = req;

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors');
});

*/

/*
// Error handler middleware
app.use(function(err, req, res, next) {
  // Set locals with information about the error
  res.locals.error = {
    message: err.message,
    status: err.status || 500,
    stack: err.stack
  };

  // Set locals with information about the request
  res.locals.request = {
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query
  };

  // Render the error page
  res.status(res.locals.error.status);
  res.render('error');
});

*/
module.exports = app;
