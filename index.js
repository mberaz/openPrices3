
/**
*   __init__
*   Server router for Node.JS handler.
* 
**/
var express = require('express');
var Promise = require("bluebird");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');

var router = express.Router();
var routes = require('./routes.js').routes;
//var mongoose    = require('mongoose');
//var sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var knex = require('knex');
var common = require('./common.js');
var ItembasketObject = require('./basket.js');
var settings = require('./settings.js');
var mustacheExpress = require('mustache-express');
global.Settings = settings;
global.ItembasketObject = ItembasketObject;
common();

var knex = require('./knex.js');
global.Knex = knex;

var bookshelf = require('./bookshelf_init.js');
global.Bookshelf = bookshelf;

var objects = require('./objects.js');
global.Objects = objects;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('html', mustacheExpress());          // register file extension mustache
app.set('view engine', 'html');                 // register file extension for partials
app.set('views', __dirname + '/html');
app.use('/web', express.static(__dirname + '/web'));// set static folder

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
* Routing controllers sets.
**/
app.get('/', function (req, res) {
  res.render('master', {
    homepage: {
      navbar: [{ href: '#home', name: 'בית', active: 'active' },
        { href: '#stores', name: 'חנויות', active: ' ' }]
    }
  });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Resurce Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      "Error": err.message,
      "status": err.status
    });
    /* res.render('error', {
       message: err.message,
       error: err
     });*/
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    "Error": err.message,
    "status": err.status
  });
  /* res.render('error', {
     message: err.message,
     error: err
   });*/
});


/**
 * Create HTTP server.
 */

app.set('port', 5000);
var server = http.createServer(app);
server.listen(5000);

