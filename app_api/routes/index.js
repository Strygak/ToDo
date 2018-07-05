var express = require('express');
var router = express.Router();
var ctrlRecord = require('../controllers/records');
var ctrlAuth = require('../controllers/authentication');
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.post('/records', ctrlRecord.recordList);
router.post('/record', auth, ctrlRecord.recordCreate);
router.get('/record/:recordid', auth, ctrlRecord.readOne);
router.put('/record/:recordid', auth, ctrlRecord.updateOne);
router.delete('/record/:recordid', auth, ctrlRecord.deleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
