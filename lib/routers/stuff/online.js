var express = require('express');
var log = require('./log');

var db = require('../../db');

var router = express.Router();

module.exports = {
  router: router,
  connecting: connect,
  disconnecting: disconnect
};

var onlineList = {};

function reqParse (req) {
  var info = req.body;
  var userAgent = info.userAgent.replace(/\./g, '_');
  var address = info.address.replace(/\./g, '_');
  return {
    userAgent: userAgent,
    address: address
  }
}

function connect (req, res) {
  var msg = reqParse(req);
  onlineList[msg.address] = 'online';
}

function disconnect (req, res) {
  var msg = reqParse(req);
  onlineList[msg.address] = 'offline';
}

function getOnlne () {
  var count = 0;
  Object.keys(onlineList).forEach(function (addressKey) {
    if (onlineList[addressKey] === 'online') {
      count += 1;
    }
  });
  return count;
}

router.get('/', function (req, res) {
  return res.json(onlineList);
});

router.get('/count', function (req, res) {
  return res.json({ online: getOnlne() });
});