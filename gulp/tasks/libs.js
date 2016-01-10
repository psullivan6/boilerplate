var config = require('../config');
var gulp   = require('gulp');

gulp.task('libs', function (callback) {
  return gulp.src(config.paths.libs.source)
    .pipe(gulp.dest(config.paths.libs.release));
});