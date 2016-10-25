var mongoose = require('mongoose');
var Rec = mongoose.model('record');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.recordList = function (req, res) {
  var recordsAll = [];

  Rec.find({}, function (err, records) {
    if (err) {
      console.log(err);
    }
    else {
      records.forEach(function(doc) {
        recordsAll.push(doc);

        console.log(recordsAll);    
      });
    }
    sendJsonResponse(res, 200, recordsAll);
  });
}

module.exports.readOne = function (req, res) {

  console.log('Finding record details', req.params);
  if (req.params && req.params.recordid) {
    Rec
      .findById(req.params.recordid)
      .exec(function(err, record) {
        if (!record) {
          sendJsonResponse(res, 404, {
            "message": "recordid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        console.log(record);
        sendJsonResponse(res, 200, record);
      });
  } else {
    console.log('No recordid specified');
    sendJsonResponse(res, 404, {
      "message": "No recordid in request"
    });
  }
}

module.exports.recordCreate = function (req, res) {
  Rec.create({
    title: req.body.title,
    description: req.body.description
  },

  function (err, record) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      console.log( JSON.stringify(record) );
      sendJsonResponse(res, 201, record);
    }
  });
}
/*
module.exports.updateOne = function (req, res) {

  if (!req.params.recordid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, recordid is required"
    });
    return;
  }
  
  Rec
    .findById(req.params.recordid)
    .exec(
      function(err, record) {
        if (!record) {
          sendJSONresponse(res, 404, {
            "message": "recordid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

  record.title = req.body.title;
  record.description = req.body.description;

  record.save(function(err, record) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, record);
    }
  });
});
}
*/

module.exports.deleteOne = function (req, res) {
  var recordid = req.params.recordid;
  if (recordid) {
 Rec
  .findByIdAndRemove(recordid)
  .exec(
    function(err, record) {
      if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 204, null);
    }
  );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No recordid"
    });
  }
};
