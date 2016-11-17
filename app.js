//require('dotenv').load();
var JWT_SECRET="thisIsSecret";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
    'app_client/app.js',
    'app_client/modalForm/uibModalController.js',
    'app_client/updateModalForm/updateTaskModalCtrl.js',
    'app_client/recordDetail/recordCtrl.js',
    'app_client/auth/register/register.ctrl.js',
    'app_client/auth/login/login.ctrl.js',
    'app_client/common/directives/footerDirective/footer.directive.js',
    'app_client/common/directives/pageHeader/pageHeader.js',
    'app_client/home/home.ctrl.js',
    'app_client/common/services/todoData.js',
    'app_client/common/services/authentication.service.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/js/todo.min.js', uglified.code, function (err){
    if(err) {
      console.log(err);
    } else {
      console.log("Script generated and saved:", 'todo.min.js');
    }
});

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

app.use('/api', routesApi);

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});

module.exports = app;
