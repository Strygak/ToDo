var mongoose = require('mongoose');

var record = new mongoose.Schema({
	title: String,
	description: String,
	email: String
});

mongoose.model('record', record);