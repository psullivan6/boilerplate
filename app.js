// #############################################################################
// Dependencies
// #############################################################################
var bodyParser = require('body-parser');
var express    = require('express');
var mongoose   = require('mongoose');
require('colors');

// Router variables
var router = express.Router();
var app    = express();

// .env influenced variables
var PORT        = process.env.PORT || '8000';
var ENVIRONMENT = (process.env.ENVIRONMENT === 'release') ? 'release' : '_source';
var DATABASE    = process.env.MONGODB_URI || 'mongodb://localhost:27017/boilerplate'; // Heroku influenced variable


// #############################################################################
// App configuration
// #############################################################################
// configure app to use bodyParser(), which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// #############################################################################
// Database Connection
// #############################################################################
mongoose.connect(DATABASE);

var database = mongoose.connection;
database.on('error', function (error) {
  console.error('ERROR connecting to the database', error);
});
database.once('open', function () {
  console.log('Successful database connection'.brightGreen);
});


// #############################################################################
// Router middleware
// #############################################################################
router.use(function (request, response, next) {
  console.log(request.method.magenta, request.url);
  next(); // make sure we go to the next routes and don't stop here
});


// #############################################################################
// App Routing
// #############################################################################
app.use('/', express.static(ENVIRONMENT));
app.use('/api/boilerplate', require('./' + ENVIRONMENT + '/api/routes/boilerplate'));


// #############################################################################
// START THE SERVER
// #############################################################################
app.listen(PORT);
console.log('Server started and repo live on', 'PORT'.brightYellow, PORT.brightYellow);