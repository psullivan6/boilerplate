var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('compile', ['css', 'js', 'json', 'html', 'libs']);

gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    'compile',
    callback
  );
});