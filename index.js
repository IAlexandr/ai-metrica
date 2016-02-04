var express = require('express');
var http = require('http');
var session = require('express-session');
var cors = require('cors');
var auth = require('./lib/auth');
var routers = require('./lib/routers');

const app = express();
app.set('json spaces', 2);
const httpServer = http.Server(app);
app.use(cors({origin: true}));
routers(app);
httpServer.listen('4444');
console.log('server listening port 4444');
