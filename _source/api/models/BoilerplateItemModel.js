var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BoilerplateItemSchema = new Schema({
  type : { type:String, enum: ["alpha", "bravo", "charlie", "delta"] },
  name : String
});

module.exports = mongoose.model('BoilerplateItemModel', BoilerplateItemSchema);