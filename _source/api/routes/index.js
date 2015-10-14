// #############################################################################
// DEPENDENCIES
// #############################################################################
var express  = require('express');
var mongoose = require('mongoose');
var router   = express.Router();


// #############################################################################
// CONNECT TO THE MONGO DATABASE
// #############################################################################
// var DATABASE = process.env.MONGOLAB_URI || 'mongodb://localhost/test'; // Heroku influenced variable

// mongoose.connect(DATABASE);

// var database = mongoose.connection;
// database.on('error', function (error) {
//   console.error(error);
// });
// database.once('open', function () {
//   console.log('Successful database connection');
// });


// #############################################################################
// CUSTOM MONGOOSE MODELS
// #############################################################################
var BoilerplateModel     = require('../../api/models/BoilerplateModel');
var BoilerplateItemModel = require('../../api/models/BoilerplateItemModel');


// #############################################################################
// API ROUTES
// #############################################################################

// middleware to use for all requests
router.use(function (request, response, next) {
  console.log(request.method, request.url);
  next(); // make sure we go to the next routes and don't stop here
});

router.route('/boilerplate')
  .get(function (request, response) {
    //find() here returns top-level populated item
    BoilerplateModel.find({}).populate('items').exec(function (error, boilerplate) {
      if (error) {
        response.send(error);
      } else {
        response.send(boilerplate);
      }
    });
  })
  .post(function (request, response) {
    var parameters  = request.body;
    var boilerplate = new BoilerplateModel();
    var itemsIDList = [];
    
    // Set the Boilerplate variables to their respective values
    if (parameters.items) {
      for (var i = 0; i < parameters.items.length; i++) {
        itemsIDList.push(parameters.items[i]._id);
      }
    }
    
    boilerplate.items = itemsIDList;
    boilerplate.label = parameters.label;
    boilerplate.name  = parameters.name;
    
    // Save the Carousel with its new attributes
    boilerplate.save(function (error) {
      if (error) {
        response.send(error);
      } else {
        response.json(boilerplate);
      }
    });
  });

router.route('/boilerplate/:id')
  .get(function (request, response) {
    BoilerplateModel.findById(request.params.id).populate('items').exec(function (error, boilerplate) {
      if (error) {
        response.send(error);
      } else {
        response.send(boilerplate);
      }
    });
  })
  .put(function (request, response) {
    var parameters = request.body;
    var itemsIDList = [];
    
    if (parameters.items) {
      for (var i = 0; i < parameters.items.length; i++) {
        itemsIDList.push(parameters.items[i]._id);
      }
    }
    
    var config = {
      label : parameters.label,
      name  : parameters.name,
      items : itemsIDList
    };
    
    BoilerplateModel.findByIdAndUpdate(request.parameters.id, config, function(error, result){
      if (error) {
        response.send(error);
      } else {
        response.json(result);
      }
    });
  });

module.exports = router;