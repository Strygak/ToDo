const mongoose = require('mongoose');
const recordsSchema = require('../models/records');
const Records = mongoose.model('Records', recordsSchema);

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

exports.recordList = (req, res) => {
    let recordsAll = [];

    Records.find({ email: req.body.email }, (err, records) => {
        if (err) {
            console.log(err);
        } else {
            records.forEach(doc => { recordsAll.push(doc); });
        }
        sendJSONresponse(res, 200, recordsAll);
    });
};

exports.read = (req, res) => {
    if (req.params && req.params.recordid) {
        Records.findById(req.params.recordid).exec((err, record) => {
            if (!record) {
                sendJSONresponse(res, 404, {
                    'message': 'recordid not found'
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, record);
          });
    } else {
        console.log('No recordid specified');
        sendJSONresponse(res, 404, { 'message': 'No recordid in request' });
    }
};

exports.create = (req, res) => {
    Records.create({
        title: req.body.title,
        description: req.body.description,
        email: req.body.email
    }, (err, record) => {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 201, record);
        }
    });
};

exports.update = (req, res) => {
    if (!req.params.recordid) {
        sendJSONresponse(res, 404, {
            'message': 'Not found, recordid is required'
        });
        return;
    }
  
    Records.findById(req.params.recordid).exec((err, record) => {
        if (!record) {
            sendJSONresponse(res, 404, {
                'message': 'recordid not found'
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }

        record.title = req.body.title;
        record.description = req.body.description;

        record.save((err, record) => {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, record);
            }
        });
    });
};

exports.delete = (req, res) => {
    let recordid = req.params.recordid;
    if (recordid) {
        Records.findByIdAndRemove(recordid).exec((err, record) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, { 'message': 'No recordid' });
    }
};
