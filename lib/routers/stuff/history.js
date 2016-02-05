var express = require('express');

var db = require('../../db');

var router = express.Router();

module.exports = {
  router: router,
  startSchedule: schedule
};

function logMessageWrite (message) {
  db.log.insert(message, function (err) {
    if (err) {
      if (message.isError) {
        console.error(message);
      } else {
        console.log(message);
      }
    }
  });
}

function schedule() {
  schedule
}
router.get('/', function (req, res) {
  db.history.find({}, function (err, docs) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(docs);
  });
});
