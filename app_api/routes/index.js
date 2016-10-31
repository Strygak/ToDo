var express = require('express');
var router = express.Router();
var ctrlRecord = require('../controllers/records');

router.get('/records', ctrlRecord.recordList);
router.post('/record', ctrlRecord.recordCreate);
router.get('/record/:recordid', ctrlRecord.readOne);
router.put('/record/:recordid', ctrlRecord.updateOne);
router.delete('/record/:recordid', ctrlRecord.deleteOne);

module.exports = router;
