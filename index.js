var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var routers = require('./lib/routers');

const app = express();
app.use(bodyParser.json({ limit: '1024mb' }));
app.set('json spaces', 2);
const httpServer = http.Server(app);
app.use(cors({origin: true}));
routers(app);
httpServer.listen('4444');
console.log('server listening port 4444');
