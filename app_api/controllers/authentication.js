const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const usersSchema = require('../models/users');
const Users = mongoose.model('Users', usersSchema);

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

passport.use(new LocalStrategy({ usernameField: 'email' },
	(username, password, done) => {
        Users.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
            	return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
            	return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
	}
));

exports.register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { 'message': 'All fields required' });
    }
    
    let user = new Users({
        name: req.body.name,
        email: req.body.email
    });
    
    user.setPassword(req.body.password);
    user.save(err => {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, { 'token': user.generateJwt() });
        }
    });
};

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { 'message': 'All fields required' });
    }

    passport.authenticate('local', (err, user) => {
        if (err) {
            sendJSONresponse(res, 404, err);
        }

        sendJSONresponse(res, 200, { 'token': user.generateJwt() });
    })(req, res);
};