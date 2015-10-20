var express = require('express');
var app = express();
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var errorhandler = require("errorhandler");
var session = require('express-session');
var favicon = require("serve-favicon");
var logger = require("morgan");
var fs = require("fs");

//routing variables


//Add variables to app
//app.set('view engine', 'jade');
//app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Session code
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret_key'
}));

var connection_string = 'localhost/bikinibottom';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/bikinibottom';
}

//Database connection - Mongoose
var db = mongoose.connect("mongodb://" + connection_string);

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

//Pass around port/ip in case we need to do in house http requests
app.use(function(req,res,next) {
  req.OPENSHIFT_PORT = port;
  req.OPENSHIFT_IP = ip;
  next();
});

//Routing


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).end();
});

module.exports = app;

process.env.NODE_ENV = 'development';
app.listen(port || 3000, ip);
console.log("We are in "+process.env.NODE_ENV);

/*app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
          process.env.OPENSHIFT_NODEJS_IP);*/
