var Router = require('express').Router;
var options = require('./../../options');
var db = require('./../db');
var routerList = require('./list');
var register = require('./stuff/register');
var online = require('./stuff/online');
var mainRouter = Router();

mainRouter.get('/', function (req, res) {
  res.json({
    version: options.version
  });
});

mainRouter.post('/regme', function (req, res) {
  register.regme(req, res);
});


mainRouter.post('/connect', function (req, res) {
  online.connecting(req, res);
});

mainRouter.post('/disconnect', function (req, res) {
  online.disconnecting(req, res);
});

var root = options.apiRoot;

module.exports = function (app) {
  app.use(root, mainRouter);

  routerList.forEach(function (route) {
    if (route.restricted) {
      app.use(root + route.mountPoint, restrictor);
    }
    app.use(root + route.mountPoint, route.module.router);
  });
};

function restrictor (req, res, next) {
  if (!options.accessKey) {
    return next();
  }
  if (options.accessKey === req.query.key) {
    return next();
  }
  res
    .status(401)
    .json({
      message: 'Unauthorized.'
    })
  ;
}
