require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const routesApi = require('./app_api/routes/index');

require('./app_api/models/db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());
app.use('/api', routesApi);
app.use((req, res) => { res.sendFile(path.join(__dirname, 'dist', 'index.html')); });

app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({'message': err.name + ': ' + err.message});
    }
});

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
