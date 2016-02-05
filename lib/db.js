var Datastore = require('nedb');
var path = require('path');

var baseDbPath = path.join(process.cwd(), 'db');
var AUTO_COMPACTION_INTERVAL = 120 * 1000; // мс

var collections = [
  'register',
  'visits',
  'log'
];

var db = {};
collections.forEach(function (collection) {
  db[collection] = new Datastore({
    filename: path.join(baseDbPath, collection),
    autoload: true
  });

  db[collection].persistence.setAutocompactionInterval(AUTO_COMPACTION_INTERVAL);
});

module.exports = db;
