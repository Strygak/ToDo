const express = require('express');
const router = express.Router();
const ctrlRecord = require('../controllers/records');
const ctrlAuth = require('../controllers/authentication');
const jwt = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.get('/records', auth, ctrlRecord.recordList);
router.post('/record', auth, ctrlRecord.create);
router.get('/record/:recordid', auth, ctrlRecord.read);
router.put('/record/:recordid', auth, ctrlRecord.update);
router.delete('/record/:recordid', auth, ctrlRecord.delete);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
