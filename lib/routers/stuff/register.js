var express = require('express');
var visits = require('./visits');
var log = require('./log');
var db = require('../../db');

var router = express.Router();

module.exports = {
  router: router,
  regme: regme
};

var users = {};

function getRegister (callback) {
  db.register.find({}, function (err, docs) {
    if (err) {
      return callback(err);
    }
    if (docs.length > 0) {
      return callback(null, docs[docs.length - 1]);
    }
    return callback(null, {});
  });
}
getRegister(function (err, doc) {
  if (err) {
    log.wr({isError: true, message: err.message});
  }
  users = doc;
});

function saveRegister (callback) {
  if (users.hasOwnProperty('_id')) {
    db.register.update({ _id: users._id }, users, function (err, newDoc) {
      if (err) {
        return callback(err, newDoc);
      }
      return callback(null, { result: 200 });
    });
  } else {
    db.register.insert(users, function (err, newDoc) {
      if (err) {
        return callback(err, newDoc);
      }
      users = newDoc;
      return callback(null, newDoc);
    });
  }
}

function prepVisits (visits, address) {
  if (typeof visits === 'object') {
    if (visits.hasOwnProperty(address)) {
      visits[address] = visits[address] + 1;
    } else {
      visits[address] = 1;
    }
  } else {
    visits = {};
    visits[address] = 1;
  }
  return visits;
}

function regme (req, res) {
  var info = req.body;
  var userAgent = info.userAgent.replace(/\./g, '_');
  var address = info.address.replace(/\./g, '_');
  visits.visit(address);
  users[userAgent] = users[userAgent] ?
    { visits : prepVisits(users[userAgent].visits, address) }
    : { visits: prepVisits({}, address) };
  saveRegister(function (err) {
    if (err) {
      log.wr({isError: true, message: err.message});
    }
    return res.status(200);
  });
}

router.get('/', function (req, res) {
  getRegister(function (err, doc) {
    if (err) {
      log.wr({isError: true, message: err.message});
      return res.status(500).json(err);
    }
    //delete doc[_id];
    return res.json(doc);
  });
});

router.get('/save', function (req, res) {
  saveRegister(function (err, newDoc) {
    if (err) {
      log.wr({isError: true, message: err.message});
      return res.status(500).json(err, res);
    }
    return res.json(newDoc);
  });
});