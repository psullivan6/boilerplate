var utility = require('gulp-util');

module.exports = function(error){
  console.warn('\n', error.toString(), '\n');
  utility.beep();
  this.emit('end');
}