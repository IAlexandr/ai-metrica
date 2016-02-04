var express = require('express');

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
    throw err;
  }
  users = doc;
});

function saveRegister (callback) {
  if (users.hasOwnProperty('_id')) {
    db.register.update({ _id: users._id }, users, function (err, newDoc) {
      if (err) {
        return callback(err, res);
      }
      return callback(null, { result: 200 });
    });
  } else {
    db.register.insert(users, function (err, newDoc) {
      if (err) {
        return callback(err, res);
      }
      users = newDoc;
      return callback(null, newDoc);
    });
  }
}

function regme (req, res) {
  var prepHeader = req.headers['user-agent'].replace(/\./g, '_');
  users[prepHeader] = users[prepHeader] ? users[prepHeader] + 1 : 1;
  saveRegister(function (err) {
    if (err) {
      return res.status(500).json(err, res);
    }
    res.json({
      code: 200
    });
  });
}

router.get('/', function (req, res) {
  getRegister(function (err, doc) {
    if (err) {
      return res.status(500).json(err);
    }
    //delete doc[_id];
    return res.json(doc);
  });
});

router.get('/save', function (req, res) {
  saveRegister(function (err, newDoc) {
    if (err) {
      return res.status(500).json(err, res);
    }
    return res.json(newDoc);
  });
});