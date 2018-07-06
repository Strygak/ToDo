const mongoose = require('mongoose');

exports.recordsSchema = new mongoose.Schema({
	title: String,
	description: String,
	email: String
});
