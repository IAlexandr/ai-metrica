var express = require('express');
var log = require('./log');

var db = require('../../db');

var router = express.Router();

module.exports = {
  router: router,
  visit: visit
};

function getVisits (expression, callback) {
  db.visits.find(expression, function (err, docs) {
    return callback(err, docs);
  });
}

function visit (address) {
  getVisits({ address: address }, function (err, docs) {
    if (err) {
      log.wr({isError: true, message: err.message});
    } else {
      if (docs.length > 0) {
        docs[0].connectionCount = docs[0].connectionCount + 1;
        db.visits.update({ _id: docs[0]._id}, function (err) {
          if (err) {
            log.wr({isError: true, message: err.message});
          }
        });
      } else {
        db.visits.insert({ address: address, connectionCount: 1 }, function (err) {
          if (err) {
            log.wr({isError: true, message: err.message});
          }
        });
      }
    }
  });
}

router.get('/', function (req, res) {
  getVisits({}, function (err, docs) {
    if (err) {
      log.wr({isError: true, message: err.message});
      return res.status(500).json(err);
    }
    return res.json(docs);
  });
});
