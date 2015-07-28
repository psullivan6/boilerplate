'use strict';

// #############################################################################
// Plugins
// #############################################################################
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var minify_css   = require('gulp-minify-css');
var minify_js    = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var requirejs    = require('requirejs');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');



// #############################################################################
// Convenience Variables + Functions
// #############################################################################
var paths = {
  css:       '_source/public/css/**/*.scss',
  html:      ['_source/public/**/*.html', '!_source/public/libs/**/*'],
  js:        ['_source/public/**/*.js', '!_source/public/libs/**/*'],
  jshint:    ['_source/public/js/**/*.js', '_source/app/**/*.js', './*.js'],
  backend:   '_source/app/**/*.js',
  move_libs: '_source/public/libs/**/*'
};

// This is set later in the development-sequence if `gulp` is run for local dev
var isLocalTask = false;

var handleErrors = function(error){
  console.warn('\n', error.toString(), '\n');
  if ((isLocalTask) && (error.plugin !== 'gulp-jshint')) {
    var beeper = require('beeper');
    beeper();
  }
};

// [TODO] move this to a centralized file where we can use it for local and 
// production dev...right now main.js runs on it's own for dev then this is used
// as the config for the production version
var requireConfig = {
  baseUrl: '_source/public',
  paths: {
    backbone :   'libs/backbone/backbone',
    jquery :     'libs/jquery/dist/jquery.min',
    text :       'libs/requirejs-text/text',
    underscore : 'libs/underscore/underscore-min'
  },
  name: 'main',
  dir: 'release/public'
};


// #############################################################################
// Tasks | Compile, Move, and error check
// #############################################################################

// =============================================================================
// Tasks > Compile CSS                                                $ gulp css
// =============================================================================
gulp.task('css', function(){
  return gulp.src(paths.css)
      .pipe(sourcemaps.init())
      .pipe(gulpif(isLocalTask, sourcemaps.init()))
        .pipe(sass().on('error', handleErrors))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('styles.css'))
        .pipe(gulpif(!isLocalTask, minify_css()))
      .pipe(gulpif(isLocalTask, sourcemaps.write()))
    .pipe(gulp.dest('release/public/css'));
});

// =============================================================================
// Tasks > Move HTML                                                 $ gulp html
// =============================================================================
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('release/public'));
});

// =============================================================================
// Tasks > Front-end JS compilation                                    $ gulp js
// =============================================================================
gulp.task('js', function(callback){
  requirejs.optimize(requireConfig, function(){
    return callback();
  }, function(error) {
    handleErrors(error);
  });
});

// =============================================================================
// Tasks > JS Hint                                                 $ gulp jshint
// =============================================================================
gulp.task('jshint', function(){
  return gulp.src(paths.jshint)
    .pipe(plumber({ errorHandler: handleErrors }))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail', { verbose: true }))
    .pipe(plumber.stop());
});

// =============================================================================
// Tasks > Backend JS                                             $ gulp backend
// =============================================================================
gulp.task('backend', function() {
  return gulp.src(paths.backend)
    .pipe(sourcemaps.init())
      .pipe(gulpif(!isLocalTask, minify_js()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('release/app'));
});

// =============================================================================
// Tasks > Move bower-based dependency libs                     $ gulp move_libs
// =============================================================================
gulp.task('move_libs', function(){
  return gulp.src(paths.move_libs)
    .pipe(gulp.dest('release/public/libs'));
});



// #############################################################################
// Tasks | Local Development related tasks
// #############################################################################

// =============================================================================
// Tasks > Watch files then run tasks                               $ gulp watch
// =============================================================================
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
});

// =============================================================================
// Tasks > Clean Disribution/release Directory                        $ gulp clean
// =============================================================================
gulp.task('clean', function (callback) {
  del('release', callback);
});

// =============================================================================
// Tasks > Clean it all: release, packages, and libs             $ gulp superclean
// =============================================================================
gulp.task('superclean', function (callback) {
  del(['release', 'node_modules', '_source/public/libs'], callback);
});



// #############################################################################
// Tasks | release and deployment related tasks
// #############################################################################

// =============================================================================
// Tasks > Sequence of local dev related tasks       NO NEED TO RUN INDIVIDUALLY
// =============================================================================
gulp.task('development-sequence', function (callback) {
  isLocalTask = true;
  return runSequence(
    'css',
    'watch',
    callback
  );
});

// =============================================================================
// Tasks > release                                                    $ gulp release
// =============================================================================
gulp.task('release', ['html', 'css', 'js', 'json', 'move_libs', 'backend']);

// =============================================================================
// Tasks > Default task                                                   $ gulp
// =============================================================================
gulp.task('default', ['development-sequence']); // for local development

module.exports = gulp;