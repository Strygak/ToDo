var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/test';
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://heroku_mf1vjvs0:o50ac0npd5rtcbb66i683dr79e@ds037205.mongolab.com:37205/heroku_mf1vjvs0';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

require('./records');
require('./users');