const passport = require('passport');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

exports.register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }
    
    let user = new Users();
    user.name = req.body.name;
    user.email = req.body.email;
    
    user.setPassword(req.body.password);
    user.save(function(err) {
        var token;
        
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            
            token = user.generateJwt();
            sendJSONresponse(res, 200, { 'token' : token });
        }
    });
};

exports.login = (req, res) => {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }

    passport.authenticate('local', (err, user) => {

        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        let token = user.generateJwt();
        sendJSONresponse(res, 200, {
            'token' : token
        });

    })(req, res);
};