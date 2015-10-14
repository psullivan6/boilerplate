var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Included Models:
var BoilerplateItemModel = require('./BoilerplateItemModel');

var BoilerplateSchema = new Schema({
  label : String,
  name  : String,
  items : [
    { type:Schema.Types.ObjectId, ref:'BoilerplateItemModel' }
  ]
});

module.exports = mongoose.model('BoilerplateModel', BoilerplateSchema);