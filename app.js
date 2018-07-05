const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const uglifyJs = require("uglify-js");
const fs = require('fs');
const passport = require('passport');
const routesApi = require('./app_api/routes/index');

require('./app_api/models/db');
require('./app_api/config/passport');
require('dotenv').load();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const appClientFiles = [
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

const uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/js/todo.min.js', uglified.code, err => {
    if (err) {
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

app.use((req, res) => { res.sendFile(path.join(__dirname, 'app_client', 'index.html')); });

app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});

module.exports = app;
