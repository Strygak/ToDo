const mongoose = require('mongoose');

const records = new mongoose.Schema({
	title: String,
	description: String,
	email: String
});

mongoose.model('Records', records);