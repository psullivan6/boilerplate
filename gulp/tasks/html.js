var config = require('../config');
var gulp   = require('gulp');

gulp.task('html', function(callback){
  for (var page = config.paths.html.pages.length - 1; page >= 0; page--) {
    gulp.src(config.paths.html.source)
      .pipe(gulp.dest(config.paths.html.pages[page]));
  }
  return callback();
});