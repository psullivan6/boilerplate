var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var config       = require('../config');
var gulp         = require('gulp');
var handleErrors = require('../helper/handleErrors');
var minify_css   = require('gulp-minify-css');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('css', function(callback){
  return gulp.src(config.paths.css.source)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', handleErrors))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(concat(config.names.css))
      .pipe(minify_css())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.css.release))
    .pipe(gulp.dest(config.paths.css.testing));
});