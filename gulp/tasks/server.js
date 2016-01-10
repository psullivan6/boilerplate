// =============================================================================
// BASE SETUP
// =============================================================================
var config  = require('../config');
var express = require('express');
var gulp    = require('gulp');
var utility = require('gulp-util');
// var bodyParser = require('body-parser');
require('colors');

// configure app to use bodyParser(), which will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// .env influenced variables
var PORT = '1030';

gulp.task('server', function(callback){
  var app = express();
  var ENVIRONMENT = (utility.env.release === true) ? 'release' : '_source';


  if (ENVIRONMENT === 'release') {
    for (var page = config.paths.html.pages.length - 1; page >= 0; page--) {
      var source = config.paths.html.pages[page].substring(9);
      app.use(source, express.static(ENVIRONMENT));
    }
  } else {
    app.use('/', express.static('_source'));
  }

  // Static CSS asset delivery (always deliver built version b/c it's 1 CSS file)
  app.use('/css', express.static('release/css'));

  app.listen(PORT);
  console.log('Repo live on', 'PORT'.brightYellow, PORT.brightYellow);

  return callback();
});