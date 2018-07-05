const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/test';
require('./users');
require('./records');

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});