/* global __dirname */
/* global process */

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var routes = require('./routes')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

