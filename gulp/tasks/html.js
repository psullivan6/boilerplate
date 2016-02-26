var config = require('../config');
var gulp   = require('gulp');

gulp.task('html', function(callback){
  return gulp.src(config.paths.html.source)
    .pipe(gulp.dest(config.paths.html.release));;
});