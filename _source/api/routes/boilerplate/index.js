// #############################################################################
// Dependencies
// #############################################################################
var express = require('express');
var router  = express.Router();


// #############################################################################
// Mongoose Models
// #############################################################################
var modelsPath = '../../../api/models/';
var BoilerplateModel     = require(modelsPath + 'boilerplate/BoilerplateModel');
var BoilerplateItemModel = require(modelsPath + 'boilerplate/BoilerplateItemModel');


// #############################################################################
// Boilerplate API routes
// #############################################################################
router.route('/')
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

router.route('/:id')
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